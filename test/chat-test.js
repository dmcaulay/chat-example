var io = require('socket.io-client')
  , should = require('should')
  , chat = require('../lib/chat');

describe('chat', function() {
  var port = 8888;
  var joe = null;
  var jon = null;
  var jane = null;
  before(function() {
    var server = chat(port);
  });
  beforeEach(function(done) {
    var count = 0;
    function connected() {
      count += 1;
      if (count == 3) done();
    }
    joe = io.connect('http://localhost:' + port, {'force new connection': true});
    jon = io.connect('http://localhost:' + port, {'force new connection': true});
    jane = io.connect('http://localhost:' + port, {'force new connection': true});
    joe.on('connect', connected);
    jon.on('connect', connected);
    jane.on('connect', connected);
  });
  afterEach(function() {
    joe.disconnect();
    jon.disconnect();
    jane.disconnect();
  });
  it('notifies the users when someone joins the chat', function(done) {
    // we're done after joe and jon are notified
    var notification = 0;
    function joined(data) {
      notification += 1;
      data.username.should.equal('jane');
      if (notification == 2) done();
    }

    joe.on('joined', joined);
    jon.on('joined', joined);
    jane.emit('joined', {username: 'jane'});
  });
  it('notifies the users when someone sends a message', function(done) {
    // we're done after jane and jon are notified
    var notification = 0;
    function message(data) {
      notification += 1;
      data.username.should.equal('joe');
      data.message.should.equal("yo what's up");
      if (notification == 2) done();
    }

    jon.on('message', message);
    jane.on('message', message);
    joe.emit('message', {username: 'joe', message: "yo what's up"});
  });
  it('notifies the users when someone leaves the chat', function(done) {
    // we're done after jane and joe are notified
    var notification = 0;
    function left(data) {
      notification += 1;
      data.username.should.equal('jon');
      if (notification == 2) done();
    }

    joe.on('left', left);
    jane.on('left', left);
    jon.emit('joined', {username: 'jon'});
    jon.disconnect();
  });
});
