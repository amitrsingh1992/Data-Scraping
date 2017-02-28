var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gpDbs');
var Schema = mongoose.Schema;

var gpSchema = new Schema({
    packageTitle: String,
    packageName: String,
    packageCategory: String
});

var User = mongoose.model('gpSchema', gpSchema);

module.exports = User;
