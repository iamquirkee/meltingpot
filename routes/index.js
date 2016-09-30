const express = require('express');
const fs = require('fs');
const common = require("../common.js");
const pug = require('pug');

const router = express.Router();

router.get('/viewcount', function(req, res) {
  var sess = req.session;
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1;
    res.end('welcome to the session demo. refresh!');
  }
});

router.get('/', function(req, res) {
  common.renderIndexPage(res);
});

router.get('/html/:page', function(req, res) {
  res.writeHead(200, {"Content-Type":"text/html"});
  fs.readFile('views/' + req.params.page +'.pug', 'utf8', function(err, view) {
    if (err) {
      res.end( "<div>No Page Found</div>" );
    } else {
      res.end( pug.render(view) );
    }
  });
});

router.use('/assets', express.static('public'));

module.exports = router;
