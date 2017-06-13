var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Brewery = require('./brewery-model');

var beerSchema = new Schema({
  beer_name: {type: String, required: true},
  style: String,
  brewery_name: {type: Schema.Types.ObjectId, ref: 'Brewery'}
},
  {collection: 'Beers'});

beerSchema.pre('save', function(next) {
  next();
});

// step 2 - create the model
var Beer = mongoose.model('Beer', beerSchema);

// step 3 - export our model
module.exports = Beer;
