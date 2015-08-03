var _ = require('highland');
var moment = require('moment');
var fs = require('fs');
var liner = require('./liner');

var config = require('./config');

fs.createReadStream(config.bitcoinHistoryPath)
	.pipe(liner)
	.pipe(_.pipeline(

	       // filter non-data lines
	        _.filter(function matchData(line){
		        return /[^a-z]{10},.+/.test(line)
	        }),

	        // parse line into object
	        _.map(function(line){

		        var args = line.split(',');

		        return {
			        date: moment(args[0], 'YYYY-MM-DD').unix(),
			        rate: args[1]
		        };

	        }),

	        // _.each(game)

	        // prep for documentation
	        _.map(function(rateObj){
		        return moment(rateObj.date, 'X').format('YY/MM/DD') + ': ' + rateObj.rate + '\n'
	        })

        ))

	.pipe(fs.createWriteStream('./.dump'));