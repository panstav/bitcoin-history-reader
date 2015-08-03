var fs = require('fs');
var request = require('request');
var moment = require('moment');

var config = require('./config');

var url = 'http://api.coindesk.com/v1/bpi/historical/close.csv?start=2010-07-18&end='
          + moment().format('YYYY-MM-DD')
          + '&index=USD';

request(url)
	.pipe(fs.createWriteStream(config.bitcoinHistoryPath));