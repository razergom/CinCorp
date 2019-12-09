const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let actorSchema = new Schema({
    name: String,
    year: String,
    died: String,
    country: String
});

let Actor = mongoose.model('Actor', actorSchema, 'actors');
module.exports = Actor;