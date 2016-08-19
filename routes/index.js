var express = require('express');
var haml = require('hamljs');
var fs = require('fs');

var router = express.Router();

router.get('/', function(req, res) {
  var hamlView = fs.readFileSync('views/index.haml', 'utf8');
  res.end( haml.render(hamlView) );
});

router.use('/assets', express.static('public'));

module.exports = router;
