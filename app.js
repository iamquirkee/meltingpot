var express = require('express');

var app = module.exports = express();

var route_main = require('./routes/index');
var route_github = require('./routes/github');

app.use('/', route_main);
app.use('/github', route_github);

// https://api.github.com/user/repos?affiliation=organization_member&access_token=e9505fe30f84419bdaa5bc86cb76578185941eee
// https://api.github.com/repos/Kaligo/kaligo-web/pulls?access_token=e9505fe30f84419bdaa5bc86cb76578185941eee

app.listen(3005);

module.exports = app;
