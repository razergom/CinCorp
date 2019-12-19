

let Actor = require('../models/Actor');
let Producer = require('../models/Producer');
let Operator = require('../models/Operator');
let Composer = require('../models/Composer');
let Impperson = require('../models/Impperson');

module.exports = {
    getCollectionPage: (req, res) => {
        let collection = req.params.collection;
        let collectionForOutput = collection[0].toUpperCase() + collection.slice(1); 

        switch (collection) {
            case 'actors':
                Actor.find((req, result) => {
                    res.render('persons.ejs', {
                        persons: result,
                        title: 'Lucasfilm',
                        collection: collection,
                        collectionForOutput: collectionForOutput,
                        user: gluser
                    });
                });
                break;
            case 'producers':
                Producer.find((req, result) => {
                    res.render('persons.ejs', {
                        persons: result,
                        title: 'Lucasfilm',
                        collection: collection,
                        collectionForOutput: collectionForOutput,
                        user: gluser
                    });
                });
                break;
            case 'operators':
                Operator.find((req, result) => {
                    res.render('persons.ejs', {
                        persons: result,
                        title: 'Lucasfilm',
                        collection: collection,
                        collectionForOutput: collectionForOutput,
                        user: gluser
                    });
                });
                break;
            case 'imppersons':
                Impperson.find((req, result) => {
                    res.render('persons.ejs', {
                        persons: result,
                        title: 'Lucasfilm',
                        collection: collection,
                        collectionForOutput: collectionForOutput,
                        user: gluser
                    });
                });
                break;
            case 'composers':
                Composer.find((req, result) => {
                    res.render('persons.ejs', {
                        persons: result,
                        title: 'Lucasfilm',
                        collection: collection,
                        collectionForOutput: collectionForOutput,
                        user: gluser
                    });
                });
                break;
        }
    },
    getAddPersonPage: (req, res) => {
        if (gluser.permission === 'read') {
            req.flash('danger', 'You do not have editor rights');
            res.redirect(`/persons/${req.params.collection}`);
            return;
        }
        res.render('addperson.ejs', {
            title: 'Lucasfilm',
            user: gluser
        });
    },
    addPerson: (req, res) => {
        if (gluser.permission === 'read') {
            req.flash('danger', 'You do not have editor rights');
            res.redirect(`/persons/${req.params.collection}`);
            return;
        }
        let name = req.body.person_name;
        let year = req.body.person_year;
        let died = req.body.person_died;
        let country = req.body.person_country;
        let collection = req.params.collection;

        switch (collection) {
            case 'actors':
                let actor = new Actor();
                actor.name = name;
                actor.born = year;
                if (died) {
                    actor.died = died;
                }
                actor.country = country;
                actor.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'producers':
                let producer = new Producer();
                producer.name = name;
                producer.born = year;
                if (died) {
                    producer.died = died;
                }
                producer.country = country;
                producer.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'operators':
                let operator = new Operator();
                operator.name = name;
                operator.born = year;
                if (died) {
                    operator.died = died;
                }
                operator.country = country;
                operator.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'imppersons':
                let impperson = new Impperson();
                impperson.name = name;
                impperson.born = year;
                if (died) {
                    impperson.died = died;
                }
                impperson.country = country;
                impperson.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'composers':
                let copmposer = new Composer();
                copmposer.name = name;
                copmposer.born = year;
                if (died) {
                    copmposer.died = died;
                }
                copmposer.country = country;
                copmposer.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
        }
        
    },
    deletePerson: (req, res) => {
        if (gluser.permission === 'read') {
            req.flash('danger', 'You do not have editor rights');
            res.redirect(`/persons/${req.params.collection}`);
            return;
        }
        let collection = req.params.collection;
        let person_id = req.params.id;

        switch (collection) {
            case 'actors':
                Actor.deleteOne({ _id: person_id }, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'producers':
                Producer.deleteOne({ _id: person_id }, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'operators':
                Operator.deleteOne({ _id: person_id }, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'imppersons':
                Impperson.deleteOne({ _id: person_id }, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'composers':
                Composer.deleteOne({ _id: person_id }, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
        }
    },
    getEditPersonPage: (req, res) => {
        if (gluser.permission === 'read') {
            req.flash('danger', 'You do not have editor rights');
            res.redirect(`/persons/${req.params.collection}`);
            return;
        }
        let collection = req.params.collection;
        let person_id = req.params.id;

        switch (collection) {
            case 'actors':
                Actor.find({ _id: person_id }, (err, result) => {
                    res.render('editperson.ejs', {
                        person: result.pop(),
                        title: 'Lucasfilm',
                        user: gluser
                    });
                });
                break;
            case 'producers':
                Producer.find({ _id: person_id }, (err, result) => {
                    res.render('editperson.ejs', {
                        person: result.pop(),
                        title: 'Lucasfilm',
                        user: gluser
                    });
                });
                break;
            case 'operators':
                Operator.find({ _id: person_id }, (err, result) => {
                    res.render('editperson.ejs', {
                        person: result.pop(),
                        title: 'Lucasfilm',
                        user: gluser
                    });
                });
                break;
            case 'imppersons':
                Impperson.find({ _id: person_id }, (err, result) => {
                    res.render('editperson.ejs', {
                        person: result.pop(),
                        title: 'Lucasfilm',
                        user: gluser
                    });
                });
                break;
            case 'composers':
                Composer.find({ _id: person_id }, (err, result) => {
                    res.render('editperson.ejs', {
                        person: result.pop(),
                        title: 'Lucasfilm',
                        user: gluser
                    });
                });
                break;
        }
    },
    editPerson: (req, res) => {
        if (gluser.permission === 'read') {
            req.flash('danger', 'You do not have editor rights');
            res.redirect(`/persons/${req.params.collection}`);
            return;
        }
        let updateInfo = {};
        updateInfo.name = req.body.person_name;
        updateInfo.born = req.body.person_year;
        if (req.body.person_died) {
            updateInfo.died = req.body.person_died;
        }
        updateInfo.country = req.body.person_country;

        let collection = req.params.collection;
        let person_id = req.params.id;

        console.log(updateInfo);
        

        switch (collection) {
            case 'actors':
                Actor.update({ _id: person_id }, updateInfo, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'producers':
                Producer.update({ _id: person_id }, updateInfo, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'operators':
                Operator.update({ _id: person_id }, updateInfo, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'imppersons':
                Impperson.update({ _id: person_id }, updateInfo, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
            case 'composers':
                Composer.update({ _id: person_id }, updateInfo, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/persons/${collection}`);
                    }
                });
                break;
        }
    }
}