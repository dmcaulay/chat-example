var http = require('http')
  , staticFiles = require('./lib/static-files')(__dirname + '/public')
  , chat = require('./lib/chat');

var server = http.createServer(staticFiles);
server.listen(8080);

chat(server);
