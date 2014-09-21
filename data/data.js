var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');
var getName = require('./getName');

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
              /*
              fs.writeFile(symbol + '.json', JSON.stringify(quote), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(symbol + '.json was saved!');
                }
              });
              */
              console.log(symbol + " fetched");
              getName(symbol, function(longname){
                 cb(longname, symbol, quote);
              })
            });
          });
        });
      });
    });
  });
}

module.exports = getQuotes;
