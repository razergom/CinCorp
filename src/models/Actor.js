const mongoose = require('mongoose');

const { Schema } = mongoose;

const actorSchema = new Schema({
  name: String,
  born: String,
  died: String,
  country: String,
});

const actorSchema2 = new Schema({
  name: String, born: String, died: String, country: String,
});

const Actor = mongoose.model('Actor', actorSchema, 'actors');
module.exports = Actor;
