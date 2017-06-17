var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Beer = require('./beer-model')

var barSchema = new Schema({
  bar_name: {type: String, required: true},
  street_address: String,
  city: String,
  state: String,
  zip: Number,
  latitude: Number,
  longitude: Number,
  beers_on_tap: [{type: Schema.Types.ObjectId, ref: 'Beer'}],
  website: String
});

barSchema.pre('save', function(next) {
  next();
});

// step 2 - create the model
var Bar = mongoose.model('Bar', barSchema);

// step 3 - export our model
module.exports = Bar;
