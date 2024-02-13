/* eslint-disable import/no-extraneous-dependencies */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const cors = require('cors');
const flash = require('connect-flash');
const morgan = require('morgan');
require('./configuration/passport');

dotenv.config();

mongoose.set('strictQuery', false);

const { mongoUrl } = process.env;

const database = 'postBoard';

const mongoDb = `${mongoUrl + database}?retryWrites=true&w=majority`;

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
app.set('view engine', 'pug');

app.use(session({
  secret: 'susuzu',
  resave: true,
  saveUninitialized: true,

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(flash());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(5000, () => console.log('app listening on port 5000!'));

module.exports = app;
