//create DB using mongoose

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var urlSchema = new schema({
  originalUrl: String,
  shortUrl: String
});

var modelClass = mongoose.model("shorturl",urlSchema);

module.exports = modelClass;