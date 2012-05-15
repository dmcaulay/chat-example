var io = require('socket.io-client')
  , should = require('should')
  , chat = require('../lib/chat');

describe('chat', function() {
  var port = 8888;
  it('notifies the users when someone joins the chat', function(done) {
    var server = chat(port);
    var joe = io.connect('http://localhost:' + port, {'force new connection': true});
    var jon = io.connect('http://localhost:' + port, {'force new connection': true});

    // we're done after joe and jon are both notified
    var notification = 0;
    function joined(data) {
      notification += 1;
      data.username.should.equal('jane');
      if (notification == 2) done();
    }

    joe.on('joined', joined);
    jon.on('joined', joined);
    var jane = io.connect('http://localhost:' + port, {'force new connection': true});
    jane.emit('joined', {username: 'jane'});
  });
});
