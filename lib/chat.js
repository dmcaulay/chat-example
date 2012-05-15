var io = require('socket.io');

module.exports = function(app) {
  var server = io.listen(app);
  server.sockets.on('connection', function(socket) {
    socket.on('joined', function(data) {
      socket.broadcast.emit('joined', data);
    });
  });
};

