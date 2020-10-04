const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (passport) => {
  // Local Strategy
  passport.use(new LocalStrategy((username, password, done) => {
    // Match Username
    const query = { username };
    User.findOne(query, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        // Match Password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            console.log(err);
          } else {
            if (isMatch) {
              gluser = user;

              return done(null, user);
            }

            return done(null, false, { message: 'Wrong Password' });
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
