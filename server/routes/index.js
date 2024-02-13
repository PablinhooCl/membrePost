/* eslint-disable camelcase */
var express = require('express');

var router = express.Router();

const user_controller = require('../controllers/UserController');
const post_controller = require('../controllers/PostsController');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/sign-up', user_controller.user_create_get);
router.post('/sign-up', user_controller.user_create_post);

router.get('/login', user_controller.user_login_get);
router.post('/login', user_controller.user_login_post);

router.get('/new-post', post_controller.post_create_get);
router.post('/new-post', post_controller.post_create_post);

module.exports = router;
