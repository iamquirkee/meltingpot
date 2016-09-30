const config = require("../config.js");
const randomstring = require('randomstring');
const request = require('request-promise');

githubEndpoint = "https://api.github.com/";

githubOAuth = {}

githubOAuth.getAccessToken = function(req, res) {
  var sess = req.session;
  if(sess.githubToken) {
    res.end(sess.githubToken);
  } else {
    res.end("");
  }
};

githubOAuth.authorizeUrl = function() {
  url = "https://github.com/login/oauth/authorize";
  url += "?client_id=" + config['GITHUB_CLIENT'];
  url += "&redirect_uri=" + config['GITHUB_BASE_URL'] + "/github/callback";
  url += "&scope=user repo gist notifications";
  url += "&state=" + randomstring.generate();
  return encodeURI(url);
};

githubOAuth.oauthAccessToken = function(req, res) {
  code = req.query.code;
  state = req.query.state;
  if(!code || !state) {
    res.end("ERROR");
    return;
  }
  url = "https://github.com/login/oauth/access_token";
  url += "?client_id=" + config['GITHUB_CLIENT'];
  url += "&client_secret=" + config['GITHUB_SECRET'];
  url += "&code=" + code;
  url += "&state=" + state;
  options = {
    method: 'GET',
    uri: url,
    json: true
  };
  request(options)
  .then(function(response) {
    req.session.githubToken = response.access_token;
    res.redirect("/");
  })
  .catch(function(err){
    res.end(err);
  });
};

githubOAuth.getOrganizationMember = function(req, res) {
  token = req.session.githubToken;
  if (!token) {
    res.end("Unauthorized");
    return;
  }
  url = githubEndpoint + "user/repos?type=all&sort=updated&direction=desc&access_token=" + token
  request({
    method: 'GET',
    uri: url,
    json: true,
    headers: {
      'User-Agent': 'meltingpot'
    },
  })
  .then(function(response) {
    res.json(response);
  })
  .catch(function(err){
    console.log(err);
    res.end("error");
  });
};

githubOAuth.getAuthenticatedUser = function(req, res) {
  token = req.session.githubToken;
  if (!token) {
    res.end("Unauthorized");
    return;
  }
  url = githubEndpoint + "user?access_token=" + token
  request({
    method: 'GET',
    uri: url,
    json: true,
    headers: {
      'User-Agent': 'meltingpot'
    },
  })
  .then(function(response) {
    res.json(response);
  })
  .catch(function(err){
    console.log(err);
    res.end("error");
  });
};

module.exports = githubOAuth;
