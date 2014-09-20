var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

/* getData: url (string) , cb (function)

  Given the URL and call back, calls cb function with the parsed JSON
*/


function getQuoteYear(symbol, year, cb){

  // URL: http://query.yahooapis.com/v1/public/yql?format=json&
  // q=select%20%2a%20from%20yahoo.finance.historicaldata%20
  // where%20symbol%20in%20%28%27YHOO%27%29%20and%20startDate%20=%20%272009-09-11%27%20and%20endDate%20=%20%272010-03-10%27&
  // diagnostics=true&env=store://datatables.org/alltableswithkeys
  var url = 'http://query.yahooapis.com/v1/public/yql';
  var startDate = year + '-01-01';
  var endDate = year+ 1 +'-01-01';

  // QUERY:
  // select * from yahoo.finance.historicaldata where symbol = "YHOO" and startDate = "2009-09-11" and endDate = "2010-03-10"
  var query = encodeURIComponent('select * from yahoo.finance.historicaldata where symbol="' + symbol +'" and startDate = "' + startDate + '" and endDate = "' + endDate + '"');

  var request = url + '?q=' + query + "&env=http%3A%2F%2Fdatatables.org%2Falltables.env&diagnostics=true&format=json";

  console.log(request);
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
function getQuotes(symbol){
  // -.- doc didn't say how to make sync call...
  getQuoteYear(symbol, 2009, function (data) {
    getQuoteYear(symbol, 2010, function (data1) {
      getQuoteYear(symbol, 2011, function (data2) {
        getQuoteYear(symbol, 2012, function (data3) {
          getQuoteYear(symbol, 2013, function (data4) {
            data.push(data1);
            data.push(data2);
            data.push(data3);
            data.push(data4);
            fs.writeFile(symbol + '.json', JSON.stringify(data), function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
          });
        });
      });
    });
  });
}

getQuotes('YHOO');
module.exports = getQuotes;


