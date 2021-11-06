// Require dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsController = require('./controllers/contacts');
const applicationsController = require('./controllers/applications');
const admin = require('firebase-admin');

// Initialize Express App
const app = express();

// Configure Settings
require('dotenv').config();
const { 
    PORT=3001, 
    CLIENT_ID,
    PRIVATE_KEY, 
    DATABASE_URL, 
    PRIVATE_KEY_ID, } = process.env;

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

// Authorization Middleware

admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "career-insights-official",
      "private_key_id": PRIVATE_KEY_ID,
      "private_key": PRIVATE_KEY.replace(/\\n/g, '\n'),
      "client_email": "firebase-adminsdk-alxt3@career-insights-official.iam.gserviceaccount.com",
      "client_id": CLIENT_ID,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-alxt3%40career-insights-official.iam.gserviceaccount.com"
  })
  });

app.use(async function(req, res, next) {
    const token = req.get('Authorization');
    
    if(token) {
        const authUser = await admin.auth().verifyIdToken(token.replace('Bearer ', ''))
        req.user = authUser;
    }

    next();
});

// router auth middleware function
function isAuthenticated(req, res, next) {
    // console.log(req)
    if(req.user) return next();
    else res.status(401).json({message: 'unauthorized!'});
}

app.use('/api/contacts', isAuthenticated, contactsController);
app.use('/api/applications', applicationsController);
app.use('api/search', applicationsController, contactsController)

// Mount Routes
app.get('/api', (req, res) => {
    res.json({message: 'Welcome to the Career Post API'})
});

// catch all route - for catching requests for routes that are not found
app.get('/api/*', (req, res) => {
    res.status(404).json({message: 'That route was not found'})
});



// Tell the app to listen
app.listen(PORT, () => console.log(`Express is listening on port:${PORT}`));