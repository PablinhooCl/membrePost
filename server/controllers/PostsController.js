const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const {passport, generateToken, authenticateToken } = require('../configuration/passport');

const Post = require('../models/Posts');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.jpg`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 520 * 1024 * 1024,
  },
});

exports.post_list = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}, 'post username')
    .sort({ date: -1 })
    .populate('username')
    .exec();

  res.render('post_list', { title: 'Post List', post_list: allPosts });
});

// eslint-disable-next-line consistent-return
exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if (post === null) {
    const err = new Error('Post not found');
    err.status = 404;
    return next(err);
  }

  res.render('post_detail', {
    tittle: post.post,
    user: post.username,
    date: post.date,
    media: post.media,
    post_content: post,
  });
});

exports.post_create_get = asyncHandler(async (req, res, next) => {
  res.render('post-form', { layout: false });
});

exports.post_create_post = [
  authenticateToken,
  asyncHandler(async (req, res) => {
    console.log('body', req.body);
    const user = req.user.prop;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { postText, imageFile } = req.body;
    console.log(imageFile, postText);
      const post = new Post({
        user: user._id,
        post_msg: postText, 
        date: new Date(),
      });

      await post.save();
      return res.status(201).json(post);
    
  }),
];

exports.post_delete_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: post delete GET');
});

exports.post_delete_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: post delete POST');
});

exports.post_update_get = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: post update GET');
});

exports.post_update_post = asyncHandler(async (req, res, next) => {
  res.send('NOT IMPLEMENTED: post update POST');
});
