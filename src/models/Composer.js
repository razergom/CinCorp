const mongoose = require('mongoose');

const { Schema } = mongoose;

const composerSchema = new Schema({
  name: String,
  born: String,
  died: String,
  country: String,
});

const Composer = mongoose.model('Composer', composerSchema, 'composers');
module.exports = Composer;
