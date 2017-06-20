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

var Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;
