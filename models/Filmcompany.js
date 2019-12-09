const mongoose = require('mongoose');
const dbref = require("mongoose-dbref");
const utils = dbref.utils;

let loaded = dbref.install(mongoose);

const DBRef = mongoose.SchemaType.DBRef;
const Schema = mongoose.Schema;

let filmcompanySchema = new Schema({
    name: String,
    year_found: String,
    description: String,
    parent: {
        name: String,
        year_found: String,
        website: String
    },
    founder: DBRef,
    website: String,
    movies: [
        {
            title: String,
            year: String,
            director: DBRef,
            genre: String,
            rating: String,
            budget: String,
            earn: String,
            time: String,
            actors: [
                {
                    actor: DBRef,
                    role: String
                }
            ],
            producers: [DBRef],
            composers: [DBRef],
            screenwriters: [DBRef],
            operators: [DBRef]
        }
    ]
});

let Filmcompany = mongoose.model('Filmcompany', filmcompanySchema, 'filmcompany');
module.exports = Filmcompany;