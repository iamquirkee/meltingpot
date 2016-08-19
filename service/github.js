var config = require("../config.js");

var githubOAuth = require('github-oauth')({
  githubClient: config['GITHUB_CLIENT'],
  githubSecret: config['GITHUB_SECRET'],
  baseURL: 'http://localhost:3005',
  loginURI: '/github/login',
  callbackURI: '/github/callback',
  scope: 'user repo gist notifications' // optional, default scope is set to user
})

githubOAuth.on('error', function(err) {
  console.error('there was a login error', err)
})

githubOAuth.on('token', function(token, serverResponse) {
  console.log('here is your shiny new github oauth token', token)
  serverResponse.end(JSON.stringify(token))
})

module.exports = githubOAuth;
