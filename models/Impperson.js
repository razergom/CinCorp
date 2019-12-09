const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imppersonSchema = new Schema({
    name: String,
    year: String,
    died: String,
    country: String
});

let Impperson = mongoose.model('Impperson', imppersonSchema, 'imppersons');
module.exports = Impperson;