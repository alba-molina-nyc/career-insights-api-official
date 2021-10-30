// Require dependencies
const express = require('express');
const Contact = require('../models/contact');
// Create router object
const router = express.Router();

// Define routes/controllers

// Index Route
router.get('/', async (req, res) => {
    try {
        res.json(await Contact.find({managedBy: req.user.uid}));
    } catch (error) {
        res.status(401).json({message: 'Please login to see contacts'});
    }
});

// Create Route
router.post('/', async (req, res) => {
    try {
        res.json(await Contact.create(req.body));
    } catch (error) {
        res.status(401).json({message: 'Please login to create a contact'});
    }
});

// /api/contacts/dwndohwudwudgwgdiuwgdiu/notes
router.post('/:id/notes', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        contact.notes.push(req.body); // pushes the data into the notes array in memory only
        await contact.save(); // we call save to persist the changes in MongoDB
        res.json(contact);
    } catch (error) {
        res.status(401).json({message: 'Sorry Something Went Wrong'});
    }
});

// Export the router object
module.exports = router;