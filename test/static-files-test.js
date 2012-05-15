var http = require('http')
  , request = require('request')
  , should = require('should')
  , staticFiles = require('../lib/static-files')(__dirname + '/fixtures');

describe('static', function() {
  var port = 8081;
  before(function() {
    var server = http.createServer(staticFiles);
    server.listen(port);
  });
  it('serves static files', function(done) {
    request({uri: 'http://localhost:' + port + '/todo.txt'}, function(err, res, body) {
      body.should.equal('- groceries\n');
      done();
    });
  });
  it('returns internal server error and status 500 if it receives an invalid request', function(done) {
    request({uri: 'http://localhost:' + port + '/invalid'}, function(err, res, body) {
      res.statusCode.should.equal(500);
      body.should.equal('Internal Server Error');
      done();
    });
  });
  it('handles index.html', function(done) {
    request({uri: 'http://localhost:' + port}, function(err, res, body) {
      body.should.equal('<div>index</div>\n');
      done();
    });
  });
});
