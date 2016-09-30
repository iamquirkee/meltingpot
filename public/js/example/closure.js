(function() {
  var fn, i, len, results, results2, url, urls;

  results = [];

  results2 = [];

  urls = ["test", "test2", "test3"];

  fn = function(url) {
    return setTimeout(function() {
      return results.push(url);
    }, 1000);
  };
  for (i = 0, len = urls.length; i < len; i++) {
    url = urls[i];
    fn(url);
    setTimeout(function() {
      return results2.push(url);
    }, 1000);
  }

  console.log(results);

  console.log(results2);

}).call(this);
