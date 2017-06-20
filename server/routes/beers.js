var express = require('express');
var router = express.Router();
var Beer = require('../models/beer-model');
var Brewery = require('../models/brewery-model');

router.get('/', function(req, res) {
  Beer.find({})
    .populate('brewery_name', ['brewery_name'])
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

router.post('/', function(req, res) {
  console.log("REQ", req);
  var addedBeer = new Beer({
    beer_name: req.body.beer_name,
    style: req.body.beer_style,
    brewery_name: req.body.brewery});

  addedBeer.save((err, data) => {
      console.log('save data', data);
      if (err) {
        console.log('Error: ', err);
        res.sendStatus(500);
      } else {
        res.send(data);
      }
    });
  });

module.exports = router;
