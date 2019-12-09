const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Init app
const app = express();

const port = 5000;

app.set('port', process.env.port || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Server Setted Up');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});