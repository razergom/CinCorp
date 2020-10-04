const mongoose = require('mongoose');

const { Schema } = mongoose;

const operatorSchema = new Schema({
  name: String,
  born: String,
  died: String,
  country: String,
});

const Operator = mongoose.model('Operator', operatorSchema, 'operators');
module.exports = Operator;
