var fs = require('fs')
  , parse = require('url').parse;

module.exports = function (rootPath) {
  return function(req, res) {
    var path = parse(req.url).pathname;
    if (path == '/') path += 'index.html';
    path = rootPath + path;

    var stream = fs.createReadStream(path);
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

