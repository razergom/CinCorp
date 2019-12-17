const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let operatorSchema = new Schema({
    name: String,
    born: String,
    died: String,
    country: String
});

let Operator = mongoose.model('Operator', operatorSchema, 'operators');
module.exports = Operator;