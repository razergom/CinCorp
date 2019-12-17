const Filmcompany = require('../models/Filmcompany');
const Impperson = require('../models/Impperson');

module.exports = {
    getFilmsPage: (req, res) => {
        Filmcompany.findOne((err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.render('films.ejs', {
                    title: result.name,
                    movies: result.movies
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
                const movie = result.movies.filter(movie => {
                    return movie.title === movie_title;
                }).pop();
                

                res.render('film.ejs', {
                    title: result.name,
                    movie: movie
                });
            }
        });
    },
    getAddFilmPage: (req, res) => {
        Impperson.find((err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.render('addfilm.ejs', {
                    title: 'Lucasfilm',
                    directors: result
                });
            }
        });
    },
    addFilm: (req, res) => {
        let movie = {};
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

        let director = req.body.movie_director; // extract id from ()
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(director);
        movie.director = matches[1];
        
        Filmcompany.findOne((err, result) => {
            result.movies.push(movie);
            result.save(err => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/films');
                }
            })
        });

        console.log(movie);
    },
    deleteFilm: (req, res) => {
        Filmcompany.findOne((err, result) => {
            if (err) {
                console.log(err);
            } else {
                let movies = result.movies.filter(movie => {
                    return movie.title === req.params.moviename;
                });
                movies.pop().remove();
                result.save(err => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/films');
                    }
                });
            }
        });
    },
    getEditFilmPage: (req, res) => {
        Filmcompany.findOne()
            .populate('movies.director')
            .exec((err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    const movie = result.movies.filter(movie => {
                        return movie.title === req.params.moviename;
                    }).pop();

                    Impperson.find((err, directors) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('editfilm.ejs', {
                                title: result.name,
                                movie: movie,
                                directors: directors
                            });
                        }
                    })
                }
            });
    },
    editFilm: (req, res) => {
        let title = req.body.movie_title;
        let year = req.body.movie_year;
        let genre = req.body.movie_genre;
        let rating = req.body.movie_rating;
        let budget = req.body.movie_budget;
        let earn = req.body.movie_earn;
        let time = req.body.movie_time;

        let directorUnprocessed = req.body.movie_director; // extract id from ()
        var regExp = /\(([^)]+)\)/;
        var matches = regExp.exec(directorUnprocessed);
        let director = matches[1];

        Filmcompany.findOne((err, result) => {
            if (err) {
                console.log(err);
            } else {
                let movie = result.movies.filter(movie => {
                    return movie.title === req.params.moviename;
                }).pop();
                
                movie.title = title;
                movie.year = year;
                movie.genre = genre;
                movie.rating = rating;
                movie.budget = budget;
                movie.earn = earn;
                movie.time = time;

                result.save(err => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect(`/films/${title}`);
                    }
                });
            }
        });
    }
}