const Filmcompany = require('../models/Filmcompany');
const Actor = require('../models/Actor');
const Producer = require('../models/Producer');
const Operator = require('../models/Operator');
const Composer = require('../models/Composer');
const Impperson = require('../models/Impperson');

module.exports = {
  getFilmsPage: (req, res) => {
    Filmcompany.findOne((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render('films.ejs', {
          title: result.name,
          movies: result.movies,
          user: gluser,
        });
      }
    });
  },
  getFilmPage: (req, res) => {
    const movie_title = req.params.title;
    Filmcompany.findOne()
      .populate('movies.director')
      .populate('movies.actors.actor')
      .populate('movies.operators')
      .populate('movies.producers')
      .populate('movies.screenwriters')
      .populate('movies.composers')
      .exec((err, result) => {
        if (err) {
          console.log(err);
        } else {
          const movie = result.movies.filter((movie) => movie.title === movie_title).pop();

          res.render('film.ejs', {
            title: result.name,
            movie,
            user: gluser,
          });
        }
      });
  },
  getAddFilmPage: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect('/films');
      return;
    }
    Impperson.find((err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.render('addfilm.ejs', {
          title: 'Lucasfilm',
          directors: result,
          user: gluser,
        });
      }
    });
  },
  addFilm: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect('/films');
      return;
    }
    const movie = {};
    movie.actors = [];
    movie.producers = [];
    movie.screenwriters = [];
    movie.composers = [];
    movie.operators = [];

    movie.title = req.body.movie_title;
    movie.year = req.body.movie_year;
    movie.genre = req.body.movie_genre;
    movie.rating = req.body.movie_rating;
    movie.budget = req.body.movie_budget;
    movie.earn = req.body.movie_earn;
    movie.time = req.body.movie_time;

    const director = req.body.movie_director; // extract id from ()
    const regExp = /\(([^)]+)\)/;
    const matches = regExp.exec(director);
    movie.director = matches[1];

    Filmcompany.findOne((err, result) => {
      result.movies.push(movie);
      result.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/films');
        }
      });
    });

    console.log(movie);
  },
  deleteFilm: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect('/films');
      return;
    }
    Filmcompany.findOne((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const movies = result.movies.filter((movie) => movie.title === req.params.moviename);
        movies.pop().remove();
        result.save((err) => {
          if (err) {
            console.log(err);
          } else {
            req.flash('success', 'Movie Deleted');
            res.redirect('/films');
          }
        });
      }
    });
  },
  getEditFilmPage: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect(`/films/${req.params.moviename}`);
      return;
    }
    Filmcompany.findOne()
      .populate('movies.director')
      .exec((err, result) => {
        if (err) {
          console.log(err);
        } else {
          const movie = result.movies.filter((movie) => movie.title === req.params.moviename).pop();

          Impperson.find((err, directors) => {
            if (err) {
              console.log(err);
            } else {
              res.render('editfilm.ejs', {
                title: result.name,
                movie,
                directors,
                user: gluser,
              });
            }
          });
        }
      });
  },
  editFilm: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect(`/films/${req.params.moviename}`);
      return;
    }
    const title = req.body.movie_title;
    const year = req.body.movie_year;
    const genre = req.body.movie_genre;
    const rating = req.body.movie_rating;
    const budget = req.body.movie_budget;
    const earn = req.body.movie_earn;
    const time = req.body.movie_time;

    const directorUnprocessed = req.body.movie_director; // extract id from ()
    const regExp = /\(([^)]+)\)/;
    const matches = regExp.exec(directorUnprocessed);
    const director = matches[1];

    Filmcompany.findOne((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const movie = result.movies.filter((movie) => movie.title === req.params.moviename).pop();

        movie.title = title;
        movie.year = year;
        movie.genre = genre;
        movie.rating = rating;
        movie.budget = budget;
        movie.earn = earn;
        movie.time = time;
        movie.director = director;

        result.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect(`/films/${title}`);
          }
        });
      }
    });
  },
  getAddPersonFilmPage: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect(`/films/${req.params.moviename}`);
      return;
    }
    const { moviename } = req.params;
    const { collection } = req.params;

    switch (collection) {
      case 'actors':
        Actor.find((req, result) => {
          res.render('addpersonfilm.ejs', {
            persons: result,
            title: 'Lucasfilm',
            collection,
            user: gluser,
          });
        });
        break;
      case 'producers':
        Producer.find((req, result) => {
          res.render('addpersonfilm.ejs', {
            persons: result,
            title: 'Lucasfilm',
            collection,
            user: gluser,
          });
        });
        break;
      case 'operators':
        Operator.find((req, result) => {
          res.render('addpersonfilm.ejs', {
            persons: result,
            title: 'Lucasfilm',
            collection,
            user: gluser,
          });
        });
        break;
      case 'screenwriters':
        Impperson.find((req, result) => {
          res.render('addpersonfilm.ejs', {
            persons: result,
            title: 'Lucasfilm',
            collection,
            user: gluser,
          });
        });
        break;
      case 'composers':
        Composer.find((req, result) => {
          res.render('addpersonfilm.ejs', {
            persons: result,
            title: 'Lucasfilm',
            collection,
            user: gluser,
          });
        });
        break;
    }
  },
  addPersonFilm: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect(`/films/${req.params.moviename}`);
      return;
    }
    const title = req.params.moviename;
    const { collection } = req.params;

    const personUnprocessed = req.body.existed_person; // extract id from ()

    const regExp = /\(([^)]+)\)/;
    const matches = regExp.exec(personUnprocessed);
    const person_id = matches[1];

    Filmcompany.findOne((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const movie = result.movies.filter((movie) => movie.title === req.params.moviename).pop();
        switch (collection) {
          case 'actors':
            const actor = {};
            actor.actor = person_id;
            actor.role = req.body.person_role;
            movie.actors.push(actor);
            break;
          case 'operators':
            movie.operators.push(person_id);
            break;
          case 'screenwriters':
            movie.screenwriters.push(person_id);
            break;
          case 'composers':
            movie.composers.push(person_id);
            break;
          case 'producers':
            movie.producers.push(person_id);
            break;
        }
        result.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect(`/films/${title}`);
          }
        });
      }
    });
  },
  deletePersonFilm: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect(`/films/${req.params.moviename}`);
      return;
    }
    const title = req.params.moviename;
    const { collection } = req.params;
    const person_id = req.params.id;

    Filmcompany.findOne((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const movie = result.movies.filter((movie) => movie.title === req.params.moviename).pop();
        switch (collection) {
          case 'actors':
            const actors = movie.actors.filter((actor) => actor.actor == person_id);
            actors.pop().remove();
            break;
          case 'operators':
            const { operators } = movie;
            operators.splice(operators.indexOf(`${person_id}`), 1);
            movie.operators = operators;
            break;
          case 'screenwriters':
            const { screenwriters } = movie;
            screenwriters.splice(screenwriters.indexOf(`${person_id}`), 1);
            movie.screenwriters = screenwriters;
            break;
          case 'composers':
            const { composers } = movie;
            composers.splice(composers.indexOf(`${person_id}`), 1);
            movie.composers = composers;
            break;
          case 'producers':
            const { producers } = movie;
            // console.log(producers);

            producers.splice(producers.indexOf(`${person_id}`), 1);
            movie.producers = producers;
            break;
        }
        result.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect(`/films/${title}`);
          }
        });
      }
    });
  },
  getEditActorFilmPage: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect(`/films/${req.params.moviename}`);
      return;
    }
    Filmcompany.findOne((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const movie = result.movies.filter((movie) => movie.title === req.params.moviename).pop();
        const actor = movie.actors.filter((actor) => actor.actor == req.params.id).pop();
        res.render('editactorfilm.ejs', {
          title: 'Lucasfilm',
          actor,
          user: gluser,
        });
      }
    });
  },
  editActorFilm: (req, res) => {
    if (gluser.permission === 'read') {
      req.flash('danger', 'You do not have editor rights');
      res.redirect(`/films/${req.params.moviename}`);
      return;
    }
    Filmcompany.findOne((err, result) => {
      if (err) {
        console.log(err);
      } else {
        const movie = result.movies.filter((movie) => movie.title === req.params.moviename).pop();
        const actor = movie.actors.filter((actor) => actor.actor == req.params.id).pop();
        actor.role = req.body.person_role;
        result.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect(`/films/${req.params.moviename}`);
          }
        });
      }
    });
  },
};
