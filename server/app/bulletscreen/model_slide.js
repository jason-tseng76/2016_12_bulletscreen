var mongoose = require('mongoose');
var async = require('async');

var slideSchema = mongoose.Schema({
	slidename : String,
	pages : Array,
	cdate : { type: Date, default: Date.now },
	ldate : { type: Date, default: Date.now },
  owner : String,
	createdate : { type: Date, default: Date.now },
	pview : { type: Number, default: 0 },
});
var slide = mongoose.model('bs_slide', slideSchema);

module.exports = slide;

/*exports.add = function(d, cb) {
	var s = new slide(d);
	s.save(cb);
}
exports.findOne = function(d, f, cb) {
	slide.find(d, f, cb);
}
exports.find = function(d, cb) {
	slide.find(d).exec(cb);
}
exports.update = function(d, nd, cb) {
	if (nd._id)
		delete nd._id;
	slide.update(d, { $set: nd }).exec(cb);
}*/