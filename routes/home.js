const Filmcompany = require('../models/Filmcompany');

module.exports = {
    getHomePage: (req, res) => {

        Filmcompany.findOne()
            .populate('founder')
            .exec((err, result) => {
                console.log(result);

                if (err) {
                    console.log(err);
                } else {
                    res.render('home.ejs', {
                        title: 'Lucasfilm',
                        company: result
                    });
                }
            });
    },
    getEditMainInfoPage: (req, res) => {
        Filmcompany.findOne()
            .populate('founder')
            .exec((err, result) => {
                console.log(result);

                if (err) {
                    console.log(err);
                } else {
                    res.render('editmain.ejs', {
                        title: 'Lucasfilm',
                        company: result
                    });
                }
            });
    },
    editMainInfo: (req, res) => {
        Filmcompany.findOne((err, result) => {
            if (err) {
                console.log(err);
            } else {
                result.description = req.body.description;
                result.website = req.body.website;
                result.save(err => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect('/home');
                    }
                });
            }
        });
    }
}