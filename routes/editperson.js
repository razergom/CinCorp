const Filmcompany = require('../models/Filmcompany');
let Actor = require('../models/Actor');
let Producer = require('../models/Producer');
let Operator = require('../models/Operator');
let Composer = require('../models/Composer');
let Impperson = require('../models/Impperson');
let Screenwriter = require('../models/Screenwriter');

module.exports = {
    getEditPersonPage: (req, res) => {
        const person_id = req.params.id;
        const collection = req.params.collection;
        
        switch (collection) {
            case 'actors':
                Actor.find({_id: person_id}, (req, result) => {
                    console.log(result);
                    
                    res.render('editperson.ejs', {
                        person: result.pop(),
                        title: 'Editing person'
                    });
                });
                break;
            case 'producers':
                Producer.find({ _id: person_id }, (req, result) => {
                    console.log(result);

                    res.render('editperson.ejs', {
                        person: result.pop(),
                        title: 'Editing person'
                    });
                });
                break;
            case 'operators':
                Operator.find({ _id: person_id }, (req, result) => {
                    console.log(result);

                    res.render('editperson.ejs', {
                        person: result.pop(),
                        title: 'Editing person'
                    });
                });
                break;
            case 'screenwriters':
                Screenwriter.find({ _id: person_id }, (req, result) => {
                    console.log(result);

                    res.render('editperson.ejs', {
                        person: result.pop(),
                        title: 'Editing person'
                    });
                });
                break;
            case 'composers':
                Composer.find({ _id: person_id }, (req, result) => {
                    console.log(result);

                    res.render('editperson.ejs', {
                        person: result.pop(),
                        title: 'Editing person'
                    });
                });
                break;
        }
    }
}