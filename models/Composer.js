const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let composerSchema = new Schema({
    name: String,
    year: String,
    died: String,
    country: String
});

let Composer = mongoose.model('Composer', composerSchema, 'composers');
module.exports = Composer;