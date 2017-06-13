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
  Beer.create({ beer_name: req.body.beer_name, style: req.body.beer_style, brewery_name: req.body.brewery})
    .exec(function(err, response) {
      if(err) {
        console.log("Error in post");
        res.send("ERROR");
      } else {
        res.sendStatus(201);
      }
    })
})

module.exports = router;
