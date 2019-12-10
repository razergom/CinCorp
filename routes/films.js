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
        console.log(movie_id);
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
       /*
       Filmcompany.findOne()
        .populate('actors')
        .populate('producers')
        .populate('operators')
        .populate('imppersons')
        .populate('composers')
        .populate('screenwriters')
        .exec((err, result) => {
            console.log(result.movies[0].actors[0].name);
        });
        */
        Filmcompany.findOne()
            .populate('actors')
            .exec((err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result.movies[0].actors[1].name);
                }
            });
    }
}