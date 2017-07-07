var rmdir = require("rimraf");
var path = require("path");

var _path = "node_modules";
var _args = process.argv;
if (_args.length == 3)
	_path = path.normalize(_args[2]);

rmdir(_path, function(err) {
	if (err)
		console.log(err);
	else
		console.log("done");
});