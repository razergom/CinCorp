const Actor = require('../models/Actor');
const Producer = require('../models/Producer');
const Operator = require('../models/Operator');
const Composer = require('../models/Composer');
const Impperson = require('../models/Impperson');
const Filmcompany = require('../models/Filmcompany');

module.exports = {
  getCollectionPage: (req, res) => {
    const { collection } = req.params;
    const collectionForOutput = collection[0].toUpperCase() + collection.slice(1);

    switch (collection) {
      case 'actors':
        Actor.find((req, result) => {
          res.render('persons.ejs', {
            persons: result,
            title: 'Lucasfilm',
            collection,
            collectionForOutput,
            user: gluser,
          });
        });
        break;
      case 'producers':
        Producer.find((req, result) => {
          res.render('persons.ejs', {
            persons: result,
            title: 'Lucasfilm',
            collection,
            collectionForOutput,
            user: gluser,
          });
        });
        break;
      case 'operators':
        Operator.find((req, result) => {
          res.render('persons.ejs', {
            persons: result,
            title: 'Lucasfilm',
            collection,
            collectionForOutput,
            user: gluser,
          });
        });
        break;
      case 'imppersons':
        Impperson.find((req, result) => {
          res.render('persons.ejs', {
            persons: result,
            title: 'Lucasfilm',
            collection,
            collectionForOutput,
            user: gluser,
          });
        });
        break;
      case 'composers':
        Composer.find((req, result) => {
          res.render('persons.ejs', {
            persons: result,
            title: 'Lucasfilm',
            collection,
            collectionForOutput,
            user: gluser,
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
      user: gluser,
    });
  },
  addPerson: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect(`/persons/${req.params.collection}`);
      return;
    }
    const name = req.body.person_name;
    const year = req.body.person_year;
    const died = req.body.person_died;
    const country = req.body.person_country;
    const { collection } = req.params;

    switch (collection) {
      case 'actors':
        const actor = new Actor();
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
        const producer = new Producer();
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
        const operator = new Operator();
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
        const impperson = new Impperson();
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
        const copmposer = new Composer();
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
    const { collection } = req.params;
    const person_id = req.params.id;

    switch (collection) {
      case 'actors':
        Filmcompany.findOne((err, company) => {
          if (err) {
            console.log(err);
          } else {
            const { movies } = company;
            movies.forEach((movie, index) => {
              const actors = movie.actors.filter((actor) => actor.actor == person_id);
              console.log(actors);
              for (let i = 0; i < actors.length; i++) {
                console.log(actors[i]);

                actors[i].remove((err) => {
                  console.log(err);
                });
              }
            });
            company.save((err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        });

        Actor.deleteOne({ _id: person_id }, (err) => {
          if (err) {
            console.log(err);
          } else {
            req.flash('success', 'Person Deleted');
            res.redirect(`/persons/${collection}`);
          }
        });
        break;
      case 'producers':
        Filmcompany.findOne((err, company) => {
          if (err) {
            console.log(err);
          } else {
            const { movies } = company;
            movies.forEach((movie, index) => {
              let delete_count = 0;
              const { producers } = movie;
              producers.forEach((producer, index) => {
                if (producer == person_id) {
                  delete_count += 1;
                }
              });
              for (let i = 0; i < delete_count; i++) {
                producers.splice(producers.indexOf(`${person_id}`), 1);
              }
            });
            company.save((err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        });

        Producer.deleteOne({ _id: person_id }, (err) => {
          if (err) {
            console.log(err);
          } else {
            req.flash('success', 'Person Deleted');
            res.redirect(`/persons/${collection}`);
          }
        });
        break;
      case 'operators':
        Filmcompany.findOne((err, company) => {
          if (err) {
            console.log(err);
          } else {
            const { movies } = company;
            movies.forEach((movie, index) => {
              let delete_count = 0;
              const { operators } = movie;
              operators.forEach((operator, index) => {
                if (operator == person_id) {
                  delete_count += 1;
                }
              });
              for (let i = 0; i < delete_count; i++) {
                operators.splice(operators.indexOf(`${person_id}`), 1);
              }
            });
            company.save((err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        });

        Operator.deleteOne({ _id: person_id }, (err) => {
          if (err) {
            console.log(err);
          } else {
            req.flash('success', 'Person Deleted');
            res.redirect(`/persons/${collection}`);
          }
        });
        break;
      case 'imppersons':
        Filmcompany.findOne((err, company) => {
          if (err) {
            console.log(err);
          } else {
            const { movies } = company;
            movies.forEach((movie, index) => {
              let delete_count = 0;
              const { screenwriters } = movie;
              screenwriters.forEach((screenwriter, index) => {
                if (screenwriter == person_id) {
                  delete_count += 1;
                }
              });
              for (let i = 0; i < delete_count; i++) {
                screenwriters.splice(screenwriters.indexOf(`${person_id}`), 1);
              }

              if (movie.director == person_id) {
                movie.director = null;
              }
            });
            if (company.founder == person_id) {
              company.founder = null;
            }
            company.save((err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        });

        Impperson.deleteOne({ _id: person_id }, (err) => {
          if (err) {
            console.log(err);
          } else {
            req.flash('success', 'Person Deleted');
            res.redirect(`/persons/${collection}`);
          }
        });
        break;
      case 'composers':
        Filmcompany.findOne((err, company) => {
          if (err) {
            console.log(err);
          } else {
            const { movies } = company;
            movies.forEach((movie, index) => {
              let delete_count = 0;
              const { composers } = movie;
              composers.forEach((composer, index) => {
                if (composer == person_id) {
                  delete_count += 1;
                }
              });
              for (let i = 0; i < delete_count; i++) {
                composers.splice(composers.indexOf(`${person_id}`), 1);
              }
            });
            company.save((err) => {
              if (err) {
                console.log(err);
              }
            });
          }
        });

        Composer.deleteOne({ _id: person_id }, (err) => {
          if (err) {
            console.log(err);
          } else {
            req.flash('success', 'Person Deleted');
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
    const { collection } = req.params;
    const person_id = req.params.id;

    switch (collection) {
      case 'actors':
        Actor.find({ _id: person_id }, (err, result) => {
          res.render('editperson.ejs', {
            person: result.pop(),
            title: 'Lucasfilm',
            user: gluser,
          });
        });
        break;
      case 'producers':
        Producer.find({ _id: person_id }, (err, result) => {
          res.render('editperson.ejs', {
            person: result.pop(),
            title: 'Lucasfilm',
            user: gluser,
          });
        });
        break;
      case 'operators':
        Operator.find({ _id: person_id }, (err, result) => {
          res.render('editperson.ejs', {
            person: result.pop(),
            title: 'Lucasfilm',
            user: gluser,
          });
        });
        break;
      case 'imppersons':
        Impperson.find({ _id: person_id }, (err, result) => {
          res.render('editperson.ejs', {
            person: result.pop(),
            title: 'Lucasfilm',
            user: gluser,
          });
        });
        break;
      case 'composers':
        Composer.find({ _id: person_id }, (err, result) => {
          res.render('editperson.ejs', {
            person: result.pop(),
            title: 'Lucasfilm',
            user: gluser,
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
    const updateInfo = {};
    updateInfo.name = req.body.person_name;
    updateInfo.born = req.body.person_year;
    if (req.body.person_died) {
      updateInfo.died = req.body.person_died;
    }
    updateInfo.country = req.body.person_country;

    const { collection } = req.params;
    const person_id = req.params.id;

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
  },
};
