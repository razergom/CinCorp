const Filmcompany = require('../models/Filmcompany');

module.exports = {
    getHomePage: (req, res) => {

        Filmcompany.findOne((err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.render('home.ejs', {
                    title: result.name,
                    website: result.website,
                    description: result.description
                });
            }
        });
    }
}