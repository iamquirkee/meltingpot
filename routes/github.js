var express = require('express');
var router = express.Router();
var githubOAuth = require('../service/github.js');

router.get('/login', function(req, res) {
  return githubOAuth.login(req, res);
});

router.get('/callback', function(req, res) {
  return githubOAuth.callback(req, res);
});

module.exports = router;
