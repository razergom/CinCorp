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

// Test comment



// Testing
let Actor = require('./models/Actor');
let Producer = require('./models/Producer');
let Operator = require('./models/Operator');
let Composer = require('./models/Composer');
let Impperson = require('./models/Impperson');
let Screenwriter = require('./models/Screenwriter');
let Filmcompany = require('./models/Filmcompany');


const { getHomePage } = require('./routes/home');
const { getFilmsPage } = require('./routes/films');



app.set('port', process.env.port || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    Filmcompany.find((err, actors) => {
        if (err) {
            console.log(err);
        } else {
            res.send(actors);
        }
    });
});
app.get('/home', getHomePage);
app.get('/films', getFilmsPage);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});