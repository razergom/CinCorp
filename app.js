const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const expressValidator = require('express-validator');
const passport = require('passport');

// Init app
const app = express();

const port = 5000;

global.gluser = null;

// Create database connection
const dbUsername = 'razergom';
const dbPassword = 'superpass';
const dbConnectString = `mongodb+srv://${dbUsername}:${dbPassword}@cinproject-mfszg.mongodb.net/cincorp?retryWrites=true&w=majority`;

// Passport Config
require('./config/passport')(passport);
// Passport Init
app.use(passport.initialize());
app.use(passport.session());

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

app.post('/login', (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res);
});
app.get('/logout', (req, res) => {
    gluser = null;
    req.logout();
    res.redirect('/login');
});


// Company
app.get('/home', getHomePage);
app.get('/home/edit', getEditMainInfoPage);
app.post('/home/edit', editMainInfo);


// Films
app.get('/films', getFilmsPage);
app.get('/films/:title', getFilmPage);
app.get('/add/films', getAddFilmPage);
app.post('/add/films', addFilm);
app.get('/films/:moviename/delete', deleteFilm);
app.get('/films/:moviename/edit', getEditFilmPage);
app.post('/films/:moviename/edit', editFilm);
app.get('/films/:moviename/add/:collection', getAddPersonFilmPage);
app.post('/films/:moviename/add/:collection', addPersonFilm);
app.get('/films/:moviename/delete/:collection/:id', deletePersonFilm);
app.get('/films/:moviename/edit/actors/:id', getEditActorFilmPage);
app.post('/films/:moviename/edit/actors/:id', editActorFilm);


// Person Collections
app.get('/persons/:collection', getCollectionPage);
app.get('/persons/:collection/add', getAddPersonPage);
app.post('/persons/:collection/add', addPerson);
app.get('/persons/:collection/edit/:id', getEditPersonPage);
app.post('/persons/:collection/edit/:id', editPerson);
app.get('/persons/:collection/delete/:id', deletePerson);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});