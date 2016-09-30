var express = require('express');
var router = express.Router();
var githubOAuth = require('../service/github.js');

router.get('/user', function(req, res) {
  githubOAuth.getAuthenticatedUser(req, res);
});

module.exports = router;
