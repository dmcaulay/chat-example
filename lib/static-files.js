var fs = require('fs')
  , parse = require('url').parse;

module.exports = function (path) {
  return function(req, res) {
    var reqPath = parse(req.url).pathname;
    if (reqPath == '/') reqPath += 'index.html';
    reqPath = path + reqPath;
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

