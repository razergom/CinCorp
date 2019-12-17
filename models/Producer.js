const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let producerSchema = new Schema({
    name: String,
    born: String,
    died: String,
    country: String
});

let Producer = mongoose.model('Producer', producerSchema, 'producers');
module.exports = Producer;