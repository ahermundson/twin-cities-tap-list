var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Beer = require('./beer-model')

var userSchema = new Schema({
  first_name: {type: String},
  last_name: {type: String},
  email: {type: String},
  facebook_userid: {type: String},
  twitter_userid: {type: String},
  favorites: [{type: Schema.Types.ObjectId, ref: 'Beer'}]
},
  {collection: 'Users'});

userSchema.pre('save', function(next) {
  next();
});

var User = mongoose.model('User', userSchema);

module.exports = User;
