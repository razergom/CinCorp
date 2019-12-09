const mongoose = require('mongoose');

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
    founder: { $ref: String, $id: Schema.ObjectId },
    website: String,
    movies: [
        {
            title: String,
            year: String,
            director: { $ref: String, $id: Schema.ObjectId },
            genre: String,
            rating: String,
            budget: String,
            earn: String,
            time: String,
            actors: [
                {
                    actor: { $ref: String, $id: Schema.ObjectId },
                    role: String
                }
            ],
            producers: [{ $ref: String, $id: Schema.ObjectId }],
            composers: [{ $ref: String, $id: Schema.ObjectId }],
            screenwriters: [{ $ref: String, $id: Schema.ObjectId }],
            operators: [{ $ref: String, $id: Schema.ObjectId }]
        }
    ]
});


let Filmcompany = mongoose.model('Filmcompany', filmcompanySchema, 'filmcompany');
module.exports = Filmcompany;