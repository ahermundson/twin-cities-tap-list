var express = require('express');
var router = express.Router();
var Beer = require('../models/beer-model');
var User = require('../models/user-model');

router.post('/', function(req, res) {
  var userToAdd = new User({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    favorites: req.body.favorites
  });

  userToAdd.save((err, data) => {
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
