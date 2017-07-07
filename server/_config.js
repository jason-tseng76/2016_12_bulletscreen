var path = require("path");

global.appRoot = path.dirname(require.main.filename);
global.OS = process.platform.indexOf("win32") < 0 ? "linux" : "win";
global.NODE_ENV = process.env.NODE_ENV;

process.env.NODE_ENV = process.env.NODE_ENV || "dev";
var output = "#######################\n"+
  "process.env.NODE_ENV = " + process.env.NODE_ENV + "\n" +
  "#######################";
console.log(output);

var _config = {};
_config.dev = {
  port: 3001,
  host_url: "127.0.0.1",
  db_connection_string: "mongodb://localhost/lab_db",
};

_config.prod_lab = {
  port: 4101,
  host_url: "lab.medialand.com.tw",
  db_connection_string: "mongodb://localhost/lab_db",
};

_config.prod_jason = {
  port: 3001,
  host_url: "jason.medialand.tw",
  db_connection_string: "mongodb://localhost/lab_db",
};

var returnConf = _config[process.env.NODE_ENV];
global._config = returnConf;
module.exports = returnConf;