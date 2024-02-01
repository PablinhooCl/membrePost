/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');

mongoose.set('strictQuery', false);

const { mongoUrl } = process.env;

const database = 'UserDb';

const mongoDb = `${mongoUrl + database}?retryWrites=true&w=majority`;

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

connectToDatabase();

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Consolidate root path route handler
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/sign-up', (req, res) => res.render('sign-up-form'));

app.post('/sign-up', async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      console.log('Error securing password:', err);
      return res.status(500).send('Error securing password');
    }

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    try {
      // Guardar el usuario en la base de datos
      await user.save();
      alert('User created successfully');

      return res.status(201).send('User created successfully');
    } catch (saveError) {
      alert('Error saving user to database:', saveError);

      return res.status(500).send('Error saving user to database');
    }
  });
});

app.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  }),
);

app.get('/log-out', (req, res) => {
  req.logout();

  res.redirect('/');
});

app.listen(3000, () => console.log('app listening on port 3000!'));

module.exports = app;
