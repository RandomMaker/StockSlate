var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

/* getData: url (string) , cb (function)

  Given the URL and call back, calls cb function with the parsed JSON
*/

var dow_jones = [{symbol: 'MMM', name: '3M Co'},
                 {symbol: 'AXP', name: 'American Express Co'},
                 {symbol: 'T', name: 'AT&T Inc'},
                 {symbol: 'BA', name: 'Boeing Co'},
                 {symbol: 'CAT', name: 'Caterpillar Inc'},
                 {symbol: 'CVX', name: 'Chevron Corp'},
                 {symbol: 'CSCO', name: 'Cisco Systems Inc'},
                 {symbol: 'DD', name: 'E I du Pont de Nemours and Co'},
                 {symbol: 'XOM', name: 'Exxon Mobil Corp'},
                 {symbol: 'GE', name: 'General Electric Co'},
                 {symbol: 'GS', name: 'Goldman Sachs Group Inc'},
                 {symbol: 'HD', name: 'Home Depot Inc'},
                 {symbol: 'INTC', name: 'Intel Corp'},
                 {symbol: 'IBM', name: 'International Business Machine...'},
                 {symbol: 'JNJ', name: 'Johnson & Johnson'},
                 {symbol: 'JPM', name: 'JPMorgan Chase and Co'},
                 {symbol: 'MCD', name: 'McDonald\'s Corp'},
                 {symbol: 'MRK', name: 'Merck & Co Inc'},
                 {symbol: 'MSFT', name: 'Microsoft Corp'},
                 {symbol: 'NKE', name: 'Nike Inc'},
                 {symbol: 'PFE', name: 'Pfizer Inc'},
                 {symbol: 'PG', name: 'Procter & Gamble Co'},
                 {symbol: 'KO', name: 'The Coca-Cola Co'},
                 {symbol: 'TRV', name: 'Travelers Companies Inc'},
                 {symbol: 'UTX', name: 'United Technologies Corp'},
                 {symbol: 'UNH', name: 'UnitedHealth Group Inc'},
                 {symbol: 'VZ', name: 'Verizon Communications Inc'},
                 {symbol: 'V', name: 'Visa Inc'},
                 {symbol: 'WMT', name: 'Wal-Mart Stores Inc'},
                 {symbol: 'DIS', name: 'Walt Disney Co'}];

function getName(symbol){
    var stock;
    for(stock in dow_jones){
        if(dow_jones[stock].symbol === symbol)
            return dow_jones[stock].name;
    }
    return '';
}

function getQuoteYear(symbol, year, cb){

  var url = 'http://query.yahooapis.com/v1/public/yql';
  var startDate = year + '-01-01';
  var endDate;
  if ( year !== '2014'){
    endDate = year+ 1 +'-01-01';
  } else {
    endDate = year + '-09-19'
  }

  // QUERY:
  // select * from yahoo.finance.historicaldata where symbol = "YHOO" and startDate = "2009-09-11" and endDate = "2010-03-10"
  var query = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol="' + symbol +'" and startDate = "' + startDate + '" and endDate = "' + endDate + '"');

  var request = url + '?q=' + query + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&diagnostics=true&format=json";

  // console.log(request);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", request, true);
  xhr.onload = function(err) {
    var buffer = xhr.responseText;
    var json = JSON.parse(buffer);
    cb(json.query.results.quote);
  }
  xhr.onerror = function(err) {
    console.log(err);
    return err;
  }
  xhr.send();
}


function getQuotes(symbol, cb){

  console.log("GET DATA FOR: " + symbol)
  // async too pro
  getQuoteYear(symbol, 2009, function (quote) {
    getQuoteYear(symbol, 2010, function (quote1) {
      getQuoteYear(symbol, 2011, function (quote2) {
        getQuoteYear(symbol, 2012, function (quote3) {
          getQuoteYear(symbol, 2013, function (quote4) {
            getQuoteYear(symbol, 2014, function (quote5) {
              quote = quote.concat(quote1);
              quote = quote.concat(quote2);
              quote = quote.concat(quote3);
              quote = quote.concat(quote4);
              quote = quote.concat(quote5);
              quote.sort(function(a,b){
                return new Date(a['Date']) - new Date(b['Date']);
              });
              fs.writeFile(symbol + '.json', JSON.stringify(quote), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(symbol + '.json was saved!');
                }
              });
              console.log(symbol + "fetched");
              cb(getName(symbol), symbol ,quote);
            });
          });
        });
      });
    });
  });
}

module.exports = getQuotes;
