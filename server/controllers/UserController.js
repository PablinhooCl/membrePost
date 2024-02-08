/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const multer = require('multer');
const passport = require('passport');

const app = express();

const router = express.Router();

dotenv.config();

const asyncHandler = require('express-async-handler');

const User = require('../models/User');
const Post = require('../models/Posts');

const { memberCoder } = process.env;

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

exports.index = asyncHandler(async (req, res) => {
  const [
    numUser,
    numPosts,
  ] = await Promise.all([
    User.countDocuments({}).exec(),
    Post.countDocuments({}).exec(),
  ]);
  res.render('index', {
    title: 'Name of the App',
    user_info: numUser,
    post_info: numPosts,
  });
});

exports.user_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: user detail: ${req.params.id}`);
});

exports.user_create_get = asyncHandler(async (req, res) => {
  res.render('sign-up-form', { layout: false });
});

exports.user_create_post = asyncHandler(async (req, res) => {
  const { username, password, memberCode } = req.body.formData;

  const hashedPassword = await bcrypt.hash(password, 10);

  const memberStatus = memberCode === memberCoder;

  try {
    const checkUser = await User.findOne({ username });

    if (checkUser) {
      return res.status(400).send({ error: 'User Exist' });
    }
    const user = new User({
      username,
      password: hashedPassword,
      member: memberStatus,
      profile_icon: null,
    });

    await user.save();

    console.log('User created successfully');
    return res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return res.status(500).send('Error al crear el usuario');
  }
});

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render('index', { user: req.user });
});

exports.user_login_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
});

exports.user_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user delete GET');
});

exports.user_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user delete POST');
});

exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user update GET');
});

exports.user_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user update POST');
});
