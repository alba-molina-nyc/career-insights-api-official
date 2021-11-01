//Req dep
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsController = require('./controllers/contacts');



//initialize express
const app = express();

//config settings
require('dotenv').config();
const { 
  DATABASE_URL, PORT=3001,} = process.env;

//configure mongodb
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('disconnected', () => console.log('Disconnected to MongoDB'));
db.on('error', (error) => console.log('MongoDB has an error ' + error.message));

//mount middleware
app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev'));

//mount routes'

app.use('/', contactsController);


app.get('/', (req, res) => {
  res.json({
    response: "this works"
});
});


//catch all route-route does not exist
app.get('/*', (req, res) => {
    res.status(404).json({message: 'That route was not found'})
});

app.listen(PORT, () => console.log(`Express is listening on port:${PORT}`));