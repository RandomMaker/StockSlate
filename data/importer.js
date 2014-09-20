var fs = require('fs');

// Mongo DB
var Db = require('mongodb').Db;
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var ReplSetServers = require('mongodb').ReplSetServers;
var ObjectID = require('mongodb').ObjectID;
var Binary = require('mongodb').Binary;
var GridStore = require('mongodb').GridStore;
var Grid = require('mongodb').Grid;
var Code = require('mongodb').Code;
var BSON = require('mongodb').pure().BSON;
var assert = require('assert');
var mongoclient = new MongoClient(new Server("mongodb://localhost/stockslate-dev", 27017), {native_parser: true});
var logger = require('../bin/logger.js');
var getQuotes = require('./data.js');

var dow_jones = ['MMM','AXP','T','BA','CAT',
                 'CVX','CSCO','DD','XOM','GE',
                 'GS','HD','INTC','IBM','JNJ',
                 'JPM','MCD','MRK','MSFT','NKE',
                 'PFE','PG','KO','TRV','UTX',
                 'UNH','VZ','V','WMT','DIS'];


