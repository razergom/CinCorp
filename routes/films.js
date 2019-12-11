const Filmcompany = require('../models/Filmcompany');

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
                console.log(movie.actors[0].actor.name);
                

                res.render('film.ejs', {
                    title: result.name,
                    movie: movie
                });
            }
        });
        
    }
}