var fs = require('fs')
  , parse = require('url').parse;

module.exports = function (path) {
  console.log(path);
  return function(req, res) {
    var url = parse(req.url);
    var reqPath = path + url.pathname;
    var stream = fs.createReadStream(reqPath);
    stream.on('data', function(chunk) {
      res.write(chunk);
    });
    stream.on('end', function() {
      res.end();
    });
    stream.on('error', function(err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    });
  };
};

