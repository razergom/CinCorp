const mongoose = require('mongoose');

const { Schema } = mongoose;

const producerSchema = new Schema({
  name: String,
  born: String,
  died: String,
  country: String,
});

const Producer = mongoose.model('Producer', producerSchema, 'producers');
module.exports = Producer;
