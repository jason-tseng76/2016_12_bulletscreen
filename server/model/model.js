var mongoose = require('mongoose');
var config = require("../_config.js");

exports.connect = function() {
	var opts = {
		server: {
			socketOptions : { keepAlive: 300000, connectTimeoutMS: 30000 }
		}
	};
	var db = mongoose.connection;
	db.on('error', function(error) {
		console.log('MongoDB error', error);
	});
	db.once('open', function() {
		console.log('MongoDB on open');
	});
	db.on("connected", function() {
		console.log("MongoDB on connected");
	});
	db.on('reconnected', function () {
		console.log('MongoDB reconnected');
	});
	db.on('disconnected', function() {
		console.log('MongoDB disconnected');
		//mongoose.connect(dbURI, {server:{auto_reconnect:true}});
	});
	db.on("error", function(err) {
		console.log("MongoDB error");
		console.log(err);
	});
	//var conStr = 'mongodb://jason:change12@ds025389.mlab.com:25389/medialand_dev';
	//conStr = 'mongodb://jason:change12@localhost:27017/lab_bulletscreen';
	//conStr = 'mongodb://localhost:27017/lab_bulletscreen';
  var conStr = config.db_connection_string;
	mongoose.Promise = global.Promise;
	mongoose.connect(conStr, opts);
}

exports.disconnect = function() {
	mongoose.disconnect(function() {
		console.log("mongoose disconnected");
	});
}