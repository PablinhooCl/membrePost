/* eslint-disable import/no-extraneous-dependencies */
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/User');

const { memberCode } = process.env;

exports.user_list = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: user list');
});

exports.user_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: user detail: ${req.params.id}`);
});

exports.user_create_get = asyncHandler(async (res) => {
  res.render('sign-up-form');
});

exports.user_create_post = asyncHandler(async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      console.log('Error securing password:', err);
      return res.status(500).send('Error securing password');
    }
    let memberStatus = null;
    if (req.body.member === memberCode) {
      memberStatus = true;
    } else {
      memberStatus = false;
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      member: memberStatus,
    });
    try {
      await user.save();
      console.log('User created successfully');
      return res.status(201).send('User created successfully');
    } catch (saveError) {
      console.error('Error saving user to database:', saveError);
      return res.status(500).send('Error saving user to database');
    }
  });
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
