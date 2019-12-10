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
        const movie_id = req.params.title;
        /*
        Filmcompany.findOne((err, result) => {
            if (err) {
                console.log(err);
            } else {
                const movie = result.movies.filter(movie => {
                    return movie.title === movie_id;
                }).pop();
                
                res.render('film.ejs', {
                    title: result.name,
                    movie: movie
                });
            }
        });
        */
       
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
                    return movie.title === movie_id;
                }).pop();

                console.log(movie);
                console.log(movie.actors[0]);
                
                

                res.render('film.ejs', {
                    title: result.name,
                    movie: movie
                });
            }
        });
        
    }
}