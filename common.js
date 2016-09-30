const pug = require('pug');
const fs = require('fs');

module.exports = {
  renderIndexPage: function(res) {
    var view = fs.readFileSync('views/index.pug', 'utf8');
    res.end( pug.render(view) );
  }
}
