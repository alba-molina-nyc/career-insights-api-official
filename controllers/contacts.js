// Require dependencies
const express = require('express');
const Contact = require('../models/contact');


// Create router object
const router = express.Router();

module.exports = router;

//Index Route
router.get('/contacts', async (req,res) => {
    try {
       res.json(await Contact.find({}));
        } catch (error) {
        res.status(401).json({message: 'please login to see contacts'})
    }
});
router.get('/contacts/new', async (req, res) => {
   res.json('this is the new contacts route')
 });

router.post('/contacts/new', async (req, res) => {
    try {
        res.json(await Contact.create(req.body));
    } catch (error) {
        res.status(401).json({message: 'Please login to create a contact'});
    }
});
//Create Route

module.exports = router;