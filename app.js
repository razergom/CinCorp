const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Init app
const app = express();

const port = 5000;

// Create database connection
const dbUsername = 'razergom';
const dbPassword = 'superpass';
const dbConnectString = `mongodb+srv://${dbUsername}:${dbPassword}@cinproject-mfszg.mongodb.net/cincorp?retryWrites=true&w=majority`;


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


const { getHomePage } = require('./routes/home');
const { getFilmsPage, getFilmPage } = require('./routes/films');
const { getEditPersonPage } = require('./routes/editperson');
const { getAddPersonPage } = require('./routes/addperson');
const { getAddFilmPage } = require('./routes/addfilm');



app.set('port', process.env.port || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/home', getHomePage);
app.get('/films', getFilmsPage);
app.get('/films/:title', getFilmPage);
app.get('/films/:moviename/edit/:collection/:id', getEditPersonPage);
app.get('/films/:moviename/add/:collection', getAddPersonPage);
app.get('/add/films/', getAddFilmPage);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});