const mongoose = require('mongoose');

const { Schema } = mongoose;

const imppersonSchema = new Schema({
  name: String,
  born: String,
  died: String,
  country: String,
});

const Impperson = mongoose.model('Impperson', imppersonSchema, 'imppersons');
module.exports = Impperson;
