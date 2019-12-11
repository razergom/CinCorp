let Actor = require('../models/Actor');
let Producer = require('../models/Producer');
let Operator = require('../models/Operator');
let Composer = require('../models/Composer');
let Impperson = require('../models/Impperson');
let Screenwriter = require('../models/Screenwriter');

module.exports = {
    getAddPersonPage: (req, res) => {
        const moviename = req.params.moviename;
        const collection = req.params.collection;
        

        switch (collection) {
            case 'actors':
                Actor.find((req, result) => {
                    res.render('addperson.ejs', {
                        persons: result,
                        title: 'Lucasfilm',
                        collection: collection
                    });
                });
                break;
            case 'producers':
                Producer.find((req, result) => {
                    res.render('addperson.ejs', {
                        persons: result,
                        title: 'Lucasfilm',
                        collection: collection
                    });
                });
                break;
            case 'operators':
                Operator.find((req, result) => {
                    res.render('addperson.ejs', {
                        persons: result,
                        title: 'Lucasfilm',
                        collection: collection
                    });
                });
                break;
            case 'screenwriters':
                Screenwriter.find((req, result) => {
                    res.render('addperson.ejs', {
                        persons: result,
                        title: 'Lucasfilm',
                        collection: collection
                    });
                });
                break;
            case 'composers':
                Composer.find((req, result) => {
                    res.render('addperson.ejs', {
                        persons: result,
                        title: 'Lucasfilm',
                        collection: collection
                    });
                });
                break;
        }
    }
}