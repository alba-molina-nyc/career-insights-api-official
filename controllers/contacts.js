// Require dependencies
const express = require('express');
const Contact = require('../models/contact');


// Create router object
const router = express.Router();


//Index Route
router.get('/contacts', async (req,res) => {
    try {
       res.json(await Contact.find({managedBy: req.user.uid}));
        } catch (error) {
        res.status(401).json({message: 'please login to see contacts'})
    }
});
router.get('/contacts', async (req, res) => {
   res.json('this is the create new contacts route')
 });

router.post('/contacts', async (req, res) => {
    try {
        res.json(await Contact.create(req.body));
    } catch (error) {
        res.status(401).json({message: 'Please login to create a contact'});
    }
});

router.post('contacts/:id/notes', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        contact.notes.push(req.body); // pushes the data into the notes array in memory only
        await contact.save(); // we call save to persist the changes in MongoDB
        res.json(contact);
    } catch (error) {
        res.status(401).json({message: 'Sorry Something Went Wrong'});
    }
});

//Create Route

module.exports = router;