const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const expressValidator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const expressMessages = require('express-messages');

// Init app
const app = express();

const port = 5000;

global.gluser = null;

// Create database connection
const dbUsername = 'razergom';
const dbPassword = 'superpass';
const dbConnectString = `mongodb+srv://${dbUsername}:${dbPassword}@cinproject-mfszg.mongodb.net/cincorp?retryWrites=true&w=majority`;


// Express Session
app.use(session({
    secret: 'happy cat',
    resave: true,
    saveUninitialized: true
}));

// Passport Config
require('./config/passport')(passport);
// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Express Messages
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = expressMessages(req, res);
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.set('port', process.env.port || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//mongoose.set('debug', true);
mongoose.connect(dbConnectString, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
const db = mongoose.connection;




// Testing
let Actor = require('./models/Actor');
let Producer = require('./models/Producer');
let Operator = require('./models/Operator');
let Composer = require('./models/Composer');
let Impperson = require('./models/Impperson');
let Screenwriter = require('./models/Screenwriter');
let Filmcompany = require('./models/Filmcompany');

// test
const { getHomePage, getEditMainInfoPage, editMainInfo } = require('./routes/home');
const { getFilmsPage, getFilmPage, getAddFilmPage, getEditFilmPage, editFilm,
        addFilm, deleteFilm, getAddPersonFilmPage, addPersonFilm, deletePersonFilm, getEditActorFilmPage,
        editActorFilm } = require('./routes/films');
const { getCollectionPage, getAddPersonPage, getEditPersonPage, addPerson, deletePerson, editPerson } = require('./routes/persons');
const { getRegisterPage, registerUser, getLoginPage } = require('./routes/users');




// Users
app.get('/register', getRegisterPage);
app.post('/register', registerUser);
app.get('/login', getLoginPage);

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});
app.get('/logout', (req, res) => {
    req.logout();
    gluser = null;
    req.flash('success', 'Logged Out');
    res.redirect('/login');
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please Login');
        res.redirect('/login');
    }
}


// Company
app.get('/home', ensureAuthenticated, getHomePage);
app.get('/home/edit', ensureAuthenticated, getEditMainInfoPage);
app.post('/home/edit', ensureAuthenticated, editMainInfo);


// Films
app.get('/films', ensureAuthenticated, getFilmsPage);
app.get('/films/:title', ensureAuthenticated, getFilmPage);
app.get('/add/films', ensureAuthenticated, getAddFilmPage);
app.post('/add/films', ensureAuthenticated, addFilm);
app.get('/films/:moviename/delete', ensureAuthenticated, deleteFilm);
app.get('/films/:moviename/edit', ensureAuthenticated, getEditFilmPage);
app.post('/films/:moviename/edit', ensureAuthenticated, editFilm);
app.get('/films/:moviename/add/:collection', ensureAuthenticated, getAddPersonFilmPage);
app.post('/films/:moviename/add/:collection', ensureAuthenticated, addPersonFilm);
app.get('/films/:moviename/delete/:collection/:id', ensureAuthenticated, deletePersonFilm);
app.get('/films/:moviename/edit/actors/:id', ensureAuthenticated, getEditActorFilmPage);
app.post('/films/:moviename/edit/actors/:id', ensureAuthenticated, editActorFilm);


// Person Collections
app.get('/persons/:collection', ensureAuthenticated, getCollectionPage);
app.get('/persons/:collection/add', ensureAuthenticated, getAddPersonPage);
app.post('/persons/:collection/add', ensureAuthenticated, addPerson);
app.get('/persons/:collection/edit/:id', ensureAuthenticated, getEditPersonPage);
app.post('/persons/:collection/edit/:id', ensureAuthenticated, editPerson);
app.get('/persons/:collection/delete/:id', ensureAuthenticated, deletePerson);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});