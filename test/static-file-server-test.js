var http = require('http'),
  , request = require('request')
  , should = require('should')
  , staticFiles = require('../lib/static-files')(__dirname + '/fixtures';

describe('static', function() {
  var port = 8081;
  before(function() {
    server = http.createServer(staticFiles);
    server.listen(port);
  });
  it('should server static files', function(done) {
    request {uri: "http://localhost:' + port + '/todo.txt", function(err, res, body) {
      body.should.equal('- groceries');
      done();
    });
  });
});
