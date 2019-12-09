const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let screenwriterSchema = new Schema({
    name: String,
    year: String,
    died: String,
    country: String
});

let Screenwriter = mongoose.model('Screenwriter', screenwriterSchema, 'screenwriters');
module.exports = Screenwriter;