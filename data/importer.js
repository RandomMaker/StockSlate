'use strict';

var Stock = require('../server/api/stock/stock.model');
var getQuotes = require('./bloomberg')
var async = require('async');
var sleep = require('sleep');

var dow_jones = ['AAPL','GOOGL','MSFT','FB','HPQ',
                 'INTC','ORCL','CSCO','BBRY','F',
                 'GM','TM','HMC','TTM','TSLA',
                 'HD','WMT','TGT','LOW','COST',
                 'EBAY','SHLD','DG','FDO']

Stock.find({}).remove(function() {
    var stock;

    async.eachSeries(dow_jones, function(symbol, callback){
        getQuotes(symbol, function(name, symbol, quote){
            // Stock.create({
            //     name: name,
            //     symbol: symbol,
            //     quote: quote
            // }, function (err, stock) {
            //     if (err) console.log(err);
            //     console.log("success: " + stock.symbol + ":" + stock.name);
            //     return;
            // });
        });
        callback();
    },
    function(err){
        // if any of the file processing produced an error, err would equal that error
        if( err ) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log("ERROR" + err);
        } else {
          console.log('All files have been processed successfully');
        }
    });

    for (stock in dow_jones){

    }
});
