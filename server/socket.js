var usersDic = {};
var conNumber = 0;

module.exports = function(server) {
  //var io = sio.of('/bulletscreen');
  var io = require("socket.io")(server, { path: '/bulletscreen/socket.io'});
  //var io = require("socket.io")(server);

  io.on('connection', function(socket){
    conNumber ++;
    console.log('connections : ' + conNumber);
    usersDic[socket.id] = {
      'id' : socket.id,
      'ip' : socket.request.connection.remoteAddress,
      'room' : ''
    }
    socket.on("_id", function(data) {
      console.log("join " + data);
      usersDic[socket.id].room = data;
      socket.join(data);
    });
    socket.on("msg", function(data) {
      if (data.str.length > 40)
        data.str = data.str.substr(0, 40);
      socket.to(usersDic[socket.id].room).emit("msg", data);
    });
    socket.on('disconnect', function(e){
      conNumber --;
      console.log('connections : ' + conNumber);
      delete usersDic[socket.id];
    });
  });
}