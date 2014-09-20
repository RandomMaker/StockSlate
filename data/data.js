var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

/* getData: url (string) , cb (function)

  Given the URL and call back, calls cb function with the parsed JSON
*/


function getQuoteYear(symbol, year, cb){

  var url = 'http://query.yahooapis.com/v1/public/yql';
  var startDate = year + '-01-01';
  var endDate = year+ 1 +'-01-01';

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
    if(json.query.results === null){
      console.log("ERR " + JSON.stringify(json));
      return;
    }
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
  getQuoteYear(symbol, 2009, function (data) {
    getQuoteYear(symbol, 2010, function (data1) {
      getQuoteYear(symbol, 2011, function (data2) {
        getQuoteYear(symbol, 2012, function (data3) {
          getQuoteYear(symbol, 2013, function (data4) {
            data = data.concat(data1);
            data = data.concat(data2);
            data = data.concat(data3);
            data = data.concat(data4);

            data.sort(function(a,b){
              return new Date(a['Date']) - new Date(b['Date']);
            });
            /*
            fs.writeFile(symbol + '.json', JSON.stringify(data), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(symbol + '.json was saved!');
                }
            });*/
            cb(data);
          });
        });
      });
    });
  });
}

module.exports = getQuotes;
