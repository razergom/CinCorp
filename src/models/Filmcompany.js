const mongoose = require('mongoose');

const { Schema } = mongoose;

const Actor = require('./Actor');
const Producer = require('./Producer');
const Operator = require('./Operator');
const Composer = require('./Composer');
const Impperson = require('./Impperson');
const Screenwriter = require('./Screenwriter');

const filmcompanySchema = new Schema({
  name: String,
  year_found: String,
  description: String,
  parent: {
    name: String,
    year_found: String,
    website: String,
  },
  founder: { type: Schema.Types.ObjectId, ref: 'Impperson' },
  website: String,
  movies: [
    {
      title: String,
      year: String,
      director: { type: Schema.Types.ObjectId, ref: 'Impperson' },
      genre: String,
      rating: String,
      budget: String,
      earn: String,
      time: String,
      actors: [
        {
          actor: { type: Schema.Types.ObjectId, ref: 'Actor' },
          role: String,
        },
      ],
      producers: [{ type: Schema.Types.ObjectId, ref: 'Producer' }],
      composers: [{ type: Schema.Types.ObjectId, ref: 'Composer' }],
      screenwriters: [{ type: Schema.Types.ObjectId, ref: 'Impperson' }],
      operators: [{ type: Schema.Types.ObjectId, ref: 'Operator' }],
    },
  ],
});

const Filmcompany = mongoose.model('Filmcompany', filmcompanySchema, 'filmcompany');
module.exports = Filmcompany;
