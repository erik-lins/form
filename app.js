var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/mean', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Database is connected'); })
    .catch(err => { console.log('Can not connect to the database', err); });

const userRoutes = require('./routes/user.route');
const formRoutes = require('./routes/form.route');

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/form', formRoutes);

app.listen(3001, function() {
    console.log('Listening on port 3001');
});
