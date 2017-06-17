var express = require('express');
var router = express.Router();
var Bar = require('../models/bar-model');
var Brewery = require('../models/brewery-model');

router.get('/', function(req, res) {
  console.log(req.query);
  if(req.query.hasOwnProperty('id')) {
    Bar.findOne({
      _id: req.query.id
    })
    .populate({
      path: 'beers_on_tap',
      populate: {
        path: 'brewery_name'
      }
    })
    .exec(function(err, collection) {
      if(err) {
        console.log("Error in bar search: ", err);
      } else {
        console.log("Collections: ", collection);
        res.send(collection);
      }
    })
  } else {
    Bar.find({})
      .exec(function(err, collection) {
        if(err) {
          console.log('Error in GET: ', err);
        } else {
          console.log("Collections: ", collection);
          res.send(collection);
        }
      }
    )
  }
});

module.exports = router;
