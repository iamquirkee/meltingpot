var express = require('express');
var router = express.Router();
var githubOAuth = require('../service/github.js');

router.get('/login', function(req, res) {
  res.redirect(githubOAuth.authorizeUrl());
});

router.get('/callback', function(req, res) {
  githubOAuth.oauthAccessToken(req, res);
});

router.get('/session', function(req, res) {
  githubOAuth.getAccessToken(req, res);
});

router.get('/organization/member', function(req, res) {
  githubOAuth.getOrganizationMember(req, res);
});

// https://api.github.com/user/repos?affiliation=organization_member&access_token=e9505fe30f84419bdaa5bc86cb76578185941eee
// https://api.github.com/repos/Kaligo/kaligo-web/pulls?access_token=e9505fe30f84419bdaa5bc86cb76578185941eee


module.exports = router;
