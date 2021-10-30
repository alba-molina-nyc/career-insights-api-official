const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsController = require('./controllers/contacts');
// const applicationsController = require('./controllers/applications');
// const roadmapsController = require('./controllers/roadmaps');
const admin = require('firebase-admin');


// Initialize Express App
const app = express();

// Configure Settings
require('dotenv').config();
const { DATABASE_URL, PORT=3001 } = process.env;
// Configure connection to MongoDB
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to MongoDB'));
db.on('disconnected', () => console.log('Disconnected to MongoDB'));
db.on('error', (error) => console.log('MongoDB has an error ' + error.message));

// Mount Middleware
app.use(cors()); // attaches a Access-Control-Allow-Origin header to the response
app.use(express.json()); // creates req.body
app.use(morgan('dev'));

// // Authorization Middleware
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
  
//   app.use(function(req, res, next) {
//       const token = req.get('Authorization')
//       console.log(token);
//       next();
//   });
  
  
  // Mount Routes
  app.get('/api', (req, res) => {
      res.json({message: 'Welcome to the Career Insights API'})
  });
  
  app.use('/api/contacts', contactsController);
//   app.use('/api/applications', applicationsController);
//   app.use('/api/roadmaps', roadmapsController);
  
  // catch all route - for catching requests for routes that are not found
  app.get('/api/*', (req, res) => {
      res.status(404).json({message: 'That route was not found'})
  });
  
  
  // Tell the app to listen
  app.listen(PORT, () => console.log(`Express is listening on port:${PORT}`));
  