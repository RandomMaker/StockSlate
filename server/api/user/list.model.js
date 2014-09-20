'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
  name: String,
  stocks: Array
});

module.exports = mongoose.model('List', ListSchema);
