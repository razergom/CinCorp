const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let producerSchema = new Schema({
    name: String,
    year: String,
    died: String,
    country: String
});

let Producer = mongoose.model('Producer', producerSchema);
module.exports = Producer;