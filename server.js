var http = require('http')
  , staticFiles = require('./lib/static-files')(__dirname + '/public');

var server = http.createServer(staticFiles);
server.listen(8080);
