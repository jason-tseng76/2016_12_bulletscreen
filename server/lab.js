var express = require('express');
var domain = require('domain');
var cluster = require('cluster');
var app = express();

require("./_config.js");
var port = _config.port;

var helmet = require('helmet');
app.use(helmet());
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(cookieParser("lab"));
app.use(bodyParser.urlencoded({ extended: false }) );
app.use(bodyParser.json());
app.set("view engine", "pug");
app.set("views", "./app");

//set static dirs
app.use(express.static('./public'));

require("./app/")(app);

var server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});
require("./socket.js")(server);

//Connect DB
require('./model/model.js').connect();

/*
######## ##     ##  ######  ######## ########  ######## ####  #######  ##    ##
##        ##   ##  ##    ## ##       ##     ##    ##     ##  ##     ## ###   ##
##         ## ##   ##       ##       ##     ##    ##     ##  ##     ## ####  ##
######      ###    ##       ######   ########     ##     ##  ##     ## ## ## ##
##         ## ##   ##       ##       ##           ##     ##  ##     ## ##  ####
##        ##   ##  ##    ## ##       ##           ##     ##  ##     ## ##   ###
######## ##     ##  ######  ######## ##           ##    ####  #######  ##    ##
*/
app.use(function (req, res, next) {
    var reqDomain = domain.create();
    reqDomain.on('error', function (err) {
      console.log(err);
      exitHandler("middleware error");
    });
    reqDomain.run(next);
});
process.stdin.resume();//so the program will not close instantly
process.on('SIGINT', exitHandler.bind(null,"SIGINT"));
process.on('exit', exitHandler.bind(null,"exit"));
process.on('uncaughtException', function(e) {
  console.log(e);
  exitHandler("uncaughtException");
});

function exitHandler(type) {
  console.log(type);
  try {
        var killTimer = setTimeout(function () { process.exit(1); }, 500);
        server.close();
        if (cluster.worker) cluster.worker.disconnect();
        require('./model/model.js').disconnect();
    } catch (e) {
        console.log('error when exit', e.stack);
    }
}