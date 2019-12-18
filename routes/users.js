const User = require('../models/User');
const bcrypt = require('bcryptjs');
const express = require('express');

module.exports = {
    getRegisterPage: (req, res) => {
        res.render('register.ejs', {
            title: 'Lucasfilm',
            user: gluser
        });
    },
    registerUser: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const password2 = req.body.password2;

        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        let errors = req.validationErrors();

        if (errors) {
            res.render('register.ejs', {
                title: 'Lucasfilm',
                user: gluser
            });
        } else {
            let newUser = new User({
                username: username,
                password: password,
                permission: 'read'
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if (error) {
                        console.log(err);
                    } else {
                        newUser.password = hash;
                        newUser.save(errorSave => {
                            if (errorSave) {
                                console.log(errorSave);
                                return;
                            } else {
                                res.redirect('/login');
                            }
                        });
                    }
                });
            });
        }
    },
    getLoginPage: (req, res) => {
        console.log(gluser);
        
        res.render('login.ejs', {
            title: 'Lucasfilm',
            user: gluser
        });
    }
}