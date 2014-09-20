'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StockSchema = new Schema({
  name: String, //String formatted like: "Apple Inc. (AAPL)"
  quote: Array  //Data from YQL
});

module.exports = mongoose.model('Stock', StockSchema);
