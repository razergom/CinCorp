const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = passport => {
    // Local Strategy
    passport.use(new LocalStrategy((username, password, done) => {
        // Match Username
        let query = { username: username };
        User.findOne(query, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                if (!user) {
                    return done(null, false);
                }

                // Match Password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (isMatch) {
                            gluser = user;
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    }
                });
            }
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};