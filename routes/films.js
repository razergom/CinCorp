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
        
        Filmcompany.findOne((err, result) => {
            if (err) {
                console.log(err);
            } else {
                const movie = result.movies.filter(movie => {
                    return movie.title === movie_id;
                }).pop();
                console.log(movie);
                
                res.render('film.ejs', {
                    title: result.name,
                    movie: movie
                });
            }
        });
    }
}