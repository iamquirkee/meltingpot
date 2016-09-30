var express = require('express');

var app = module.exports = express();

var redis_session = require('./service/session.js');
app.use(redis_session);

// ROUTING

var route_main = require('./routes/index');
var route_github = require('./routes/github');
var route_user = require('./routes/user');

app.use('/', route_main);

app.use('/github', route_github);

// app.use('/api', function(req, res, next) {
//   res.writeHead(200, {"Content-Type": "application/json"});
//   next();
// });

app.use('/api', route_user);

app.listen(3005);

module.exports = app;
