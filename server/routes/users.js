var express = require('express');
var router = express.Router();
var Beer = require('../models/beer-model');
var User = require('../models/user-model');

router.get('/', (req, res) => {
  console.log('Req.query: ', req.query);
  console.log("QUERY.EMAIL: ", req.query.email);
  if (req.query.hasOwnProperty('email')){
    User.findOne({email: req.query.email})
      .exec((err, collection) => {
        if(err) {
          console.log("Error in bar search: ", err);
        } else {
          console.log("Collections: ", collection);
          res.send(collection);
        }
      });
  } else if (req.query.hasOwnProperty('id')){
    User.findOne({_id: req.query.id})
      .exec((err, collection) => {
        if(err) {
          console.log("Error in bar search: ", err);
        } else {
          console.log("Collections: ", collection);
          res.send(collection);
        }
      });
  }
});

// router.post('/', function(req, res) {
//   var userToAdd = new User({
//     email: req.body.email,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     favorites: req.body.favorites
//   });
//
//   userToAdd.save((err, data) => {
//       console.log('save data', data);
//       if (err) {
//         console.log('Error: ', err);
//         res.sendStatus(500);
//       } else {
//         res.send(data);
//       }
//     });
// });

module.exports = router;
