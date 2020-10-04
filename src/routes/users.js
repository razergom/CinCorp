const bcrypt = require('bcryptjs');
const express = require('express');
const User = require('../models/User');

module.exports = {
  getRegisterPage: (req, res) => {
    res.render('register.ejs', {
      title: 'Lucasfilm',
      user: gluser,
      errors: null,
    });
  },
  registerUser: (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    const { password2 } = req.body;

    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
      res.render('register.ejs', {
        title: 'Lucasfilm',
        user: gluser,
        errors,
      });
    } else {
      const newUser = new User({
        username,
        password,
        permission: 'read',
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) {
            console.log(err);
          } else {
            newUser.password = hash;
            newUser.save((errorSave) => {
              if (errorSave) {
                console.log(errorSave);
              } else {
                req.flash('success', 'You are now registered and can Sign In');
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
      user: gluser,
    });
  },
};
