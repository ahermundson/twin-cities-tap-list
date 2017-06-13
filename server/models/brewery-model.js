var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brewerySchema = new Schema({
  brewery_name: {type: String, required: true}
});

brewerySchema.pre('save', function(next) {
  next();
});

// step 2 - create the model
var Brewery = mongoose.model('Brewery', brewerySchema);

// step 3 - export our model
module.exports = Brewery;
