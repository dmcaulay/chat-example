var io = require('socket.io');


module.exports = function(app) {
  var server = io.listen(app);
  server.set('log level', 1);
  server.sockets.on('connection', function(socket) {
    var username = null;
    socket.on('joined', function(data) {
      username = data.username;
      socket.broadcast.emit('joined', data);
    });
    socket.on('message', function(data) {
      socket.broadcast.emit('message', data);
    });
    socket.on('disconnect', function(data) {
      if (username) {
        server.sockets.emit('left', {username: username});
      }
    });
  });
};

