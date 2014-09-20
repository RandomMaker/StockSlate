var mongoose = require('mongoose');
//var config = require('../server/config/environment');

// Connect to database
mongoose.connect('mongodb://localhost/stockslate-dev', {
      db: {
        safe: true
      }
    });

require('./importer');
