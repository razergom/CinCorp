const Impperson = require('../models/Impperson');

module.exports = {
    getAddFilmPage: (req, res) => {
        console.log('WTF');
        
        Impperson.find((err, result) => {
            if (err) {
                //console.log(err);
            } else {
                res.render('addfilm.ejs', {
                    title: 'Lucasfilm',
                    directors: result
                });
            }
        });
    }
}