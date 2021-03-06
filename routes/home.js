const Filmcompany = require('../models/Filmcompany');

module.exports = {
    getHomePage: (req, res) => {

        Filmcompany.findOne()
            .populate('founder')
            .exec((err, result) => {

                if (err) {
                    console.log(err);
                } else {
                    res.render('home.ejs', {
                        title: 'Lucasfilm',
                        company: result,
                        user: gluser
                    });
                }
            });
    },
    getEditMainInfoPage: (req, res) => {
        if (gluser.permission === 'read') {
            req.flash('danger', 'You do not have editor rights');
            res.redirect(`/home`);
            return;
        }
        Filmcompany.findOne()
            .populate('founder')
            .exec((err, result) => {

                if (err) {
                    console.log(err);
                } else {
                    res.render('editmain.ejs', {
                        title: 'Lucasfilm',
                        company: result,
                        user: gluser
                    });
                }
            });
    },
    editMainInfo: (req, res) => {
        if (gluser.permission === 'read') {
            req.flash('danger', 'You do not have editor rights');
            res.redirect(`/home`);
            return;
        }
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