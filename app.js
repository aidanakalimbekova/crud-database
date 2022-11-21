const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

var customers = require('./routes/customers'); 
var users = require('./routes/users');
var users = require('./routes/country');
var routes = require('./routes');
var app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', users.list);
app.get('/users/add', users.add);
app.post('/users/add', users.save);
app.get('/users/delete/:id', users.delete);
app.get('/users/edit/:id', users.edit);
app.post('/users/edit/:id', users.update);

app.get('/country', country.list);
app.get('/country/add', country.add);
app.post('/country/add', country.save);
app.get('/country/delete/:id', country.delete);
app.get('/country/edit/:id', country.edit);
app.post('/country/edit/:id', country.update);


app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});