var fs = require('fs');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/stockslate-dev', {
      db: {
        safe: true
      }
    });

var Stock = require('../server/api/stock/stock.model');

var dow_jones = ['AAPL','GOOGL','MSFT','FB','HPQ',
                 'INTC','ORCL','CSCO','BBRY','F',
                 'GM','TM','HMC','TTM','TSLA',
                 'HD','WMT','TGT','LOW','COST',
                 'EBAY','SHLD','DG','FDO']

var writedata;
for (stock in dow_jones){
  writedata = require('./DataFinal/' + dow_jones[stock] + '.json');
  Stock.create(writedata, function (err, stock) {
      if (err) console.log(err);
      console.log("success: " + stock.symbol + ":" + stock.name);
      return;
  });
}
