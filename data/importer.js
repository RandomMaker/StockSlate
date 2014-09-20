'use strict';

var Stock = require('../server/api/stock/stock.model');
var getQuotes = require('./data')

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

Stock.find({}).remove(function() {
    var stock;
    for (stock in dow_jones){
        getQuotes(dow_jones[stock].symbol, function(name, symbol, quote){
            Stock.create({
                name: name,
                symbol: symbol,
                quote: quote
            }, function (err, stock) {
                if (err) console.log(err);
                console.log("success: " + stock.symbol + ":" + stock.name);
                return;
            });
        });
    }
});
