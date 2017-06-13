var express = require('express');
var router = express.Router();
var Brewery = require('../models/brewery-model');

router.get('/', function(req, res) {
  Brewery.find({})
    .exec(function(err, collection) {
      if(err) {
        console.log('Error in GET: ', err);
      } else {
        console.log("Collections: ", collection);
        res.send(collection);
      }
    }
  )
});

module.exports = router;
