jQuery(function( $ ) {

  var App = {
    init: function() {
      this.ENTER_KEY = 13;
      this.cacheElements();
      this.bindEvents();
      this.setupSocketIo();
      this.$username.focus();
    },
    cacheElements: function() {
      this.$header = $('#header');
      this.$username = $('#username');
      this.$newMessage = $('#new-message');
      this.$messageList = $('#message-list');
    },
    bindEvents: function() {
      this.$username.on('keyup', this.joinChat);
      this.$newMessage.on('keyup', this.sendMessage );
    },
    setupSocketIo: function()
    {
      this.socket = io.connect();
      this.socket.on('joined', this.userJoined);
      this.socket.on('message', this.messageReceived);
      this.socket.on('left', this.userLeft);
    },
    getVal: function(e, cb) {
      var $el = $(e.target)
        , val = $.trim($el.val());
      if (e.which == App.ENTER_KEY && val) {
        cb(val, $el);
      }
    },
    joinChat: function(e) {
      App.getVal(e, function(val, $el) {
        App.$header.html('Chat - ' + val);
        App.$username.remove();
        App.$newMessage.removeClass('hidden');
        App.$newMessage.focus();
        App.username = val;
        App.socket.emit('joined', {username:val});
      });
    },
    sendMessage: function(e) {
      App.getVal(e, function(val, $el) {
        var message = {
          username: App.username,
          message: val
        };
        $el.val('');
        App.messageReceived(message);
        App.socket.emit('message', message);
      });
    },
    userJoined: function(message) {
      App.appendMessage(message.username, 'joined the chat', true);
    },
    messageReceived: function(message) {
      App.appendMessage(message.username, message.message);
    },
    userLeft: function(message) {
      App.appendMessage(message.username, 'left the chat', true);
    },
    appendMessage: function(username, message, isAction) {
      message = '<b>' + App.displayName(username) + '</b>: ' + message;
      if (isAction) message = '(' + message + ')';
      App.$messageList.append('<div>' + message + '</div>');
      App.$messageList.scrollTop(App.$messageList[0].scrollHeight);
    },
    displayName: function(username) {
      return username == App.username ? 'me' : username;
    }
  };

  App.init();

});
