module.exports = function(app) {
	app.all('/', function(req, res) {
		res.send("index");
	});
	/*app.use(function(req, res, next) {
		console.log(req.path);
		next();
	});*/
	require("./bulletscreen")(app);
	//require("./github")(app);
	//require("./fmng")(app);
	app.use(http500);
	app.use(http404);
}
function http500(err, req, res, next) {
	console.log(err.stack);
	res.status(500).send('HTTP 500...');
}
function http404(req, res) {
	console.log(req.path);
	console.log('404');
	res.status(404).send('HTTP 404...');
}