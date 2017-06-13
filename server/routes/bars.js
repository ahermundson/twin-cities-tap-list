var express = require('express');
var router = express.Router();
var Bar = require('../models/bar-model');

router.get('/', function(req, res) {
  console.log(req.query);
  if(req.query.hasOwnProperty('id')) {
    Bar.find({
      beers_on_tap: req.query.id
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

router.put('/', function(req,res) {
  Bar.findOneAndUpdate({"_id": req.body.bar_id},
    { $set: {"beers_on_tap": req.body.beers_on_tap } }
  )
  .exec(function(err, response) {
    if(err) {
      console.log(`Here is the error: ${err}`);
    } else {
      console.log(response);
      res.sendStatus(201);
    }
  })
});

module.exports = router;
