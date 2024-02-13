const passport = require('passport');
const express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/User');
const Post = require('../models/Posts');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log('Nombre de usuario recibido:', username);
      console.log('Contraseña recibida:', password);

      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username', user });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: 'Incorrect password', user });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// passport.serializeUser((user, cb) => {
//   process.nextTick(() => {
//     console.log('Serializing user:');
//     console.log('User ID:', user.id);
//     console.log('Username:', user.username);
//     console.log('Is Member:', user.member);
//     cb(null, {
//       id: user._id,
//       username: user.username,
//       member: user.member,
//     });
//   });
// });

// passport.deserializeUser((user_id, cb) => {
//   User.findById(user_id, (err, user) => cb(null, user));
// });
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => done(null, User.getUserById(id)));

module.exports = router;
