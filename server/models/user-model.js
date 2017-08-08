var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Beer = require('./beer-model');
var Bar = require('./bar-model');
var Brewery = require('./brewery-model');

var userSchema = new Schema({
  first_name: {type: String},
  last_name: {type: String},
  email: {type: String},
  facebook_userid: {type: String},
  twitter_userid: {type: String},
  favorite_beers: [{type: Schema.Types.ObjectId, ref: 'Beer'}],
  favorite_bars: [{type: Schema.Types.ObjectId, ref: 'Bar'}],
  favorite_breweries: [{type: Schema.Types.ObjectId, ref: 'Brewery'}]
},
  {collection: 'Users'});

userSchema.pre('save', function(next) {
  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
