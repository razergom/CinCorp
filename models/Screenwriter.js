const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let screenwriterSchema = new Schema({
    name: String,
    born: String,
    died: String,
    country: String
});

let Screenwriter = mongoose.model('Screenwriter', screenwriterSchema, 'screenwriters');
module.exports = Screenwriter;