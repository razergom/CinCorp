const mongoose = require('mongoose');

const { Schema } = mongoose;

const screenwriterSchema = new Schema({
  name: String,
  born: String,
  died: String,
  country: String,
});

const Screenwriter = mongoose.model('Screenwriter', screenwriterSchema, 'screenwriters');
module.exports = Screenwriter;
