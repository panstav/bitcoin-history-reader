var stream = require('stream');
var liner = new stream.Transform({ objectMode: true });

var count = 0;
liner._transform = function (chunk, encoding, next) {

	if (chunk === null) process.exit(0);

	var stream = this;

	var data = chunk.toString();
	if (this._lastLineData) data = this._lastLineData + data;

	var lines = data.split('\n');
	this._lastLineData = lines.splice(lines.length - 1, 1)[0];

	lines
		.filter(function(line){ return !!line })
		.forEach(function(line){ stream.push(line) });

	next();
};

liner._flush = function(done) {
	if (this._lastLineData) this.push(this._lastLineData);
	this._lastLineData = null;

	done();
};

module.exports = liner;