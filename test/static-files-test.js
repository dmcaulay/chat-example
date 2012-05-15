var http = require('http')
  , request = require('request')
  , should = require('should')
  , staticFiles = require('../lib/static-files')(__dirname + '/fixtures');

describe('static', function() {
  var port = 8081;
  var server = null;
  before(function() {
    server = http.createServer(staticFiles);
    server.listen(port);
  });
  after(function() {
    server.close();
  });
  it('serves static files', function(done) {
    request({uri: 'http://localhost:' + port + '/todo.txt'}, function(err, res, body) {
      body.should.equal('- groceries\n');
      done();
    });
  });
});
