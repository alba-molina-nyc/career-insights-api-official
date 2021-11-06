// Require dependencies
// Require dependencies
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
// Create router object


// Define routes/controllers


// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ INDEX ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ 
router.get('/', async (req, res) => {
    try {
        res.json(await Contact.find({managedBy: req.user.uid}));
    } catch (error) {
        res.status(401).json({message: 'Please login to see contacts'});
    }
});

// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ INDEX ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ 
router.get('/chart', async (req, res) => {
    try {
        res.json(await Contact.find({managedBy: req.user.uid}));
    } catch (error) {
        res.status(401).json({message: 'chart'});
    }
});


// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ DELETE ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ 
router.delete('/', async (req, res) => {
    try {
        res.json(await Contact.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(401).json({message: 'Failed to delete contact please try again'})
    }
});

// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ UPDATE ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ 
router.put('/', async (req, res) => {
    try {
        res.json(await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true}
            ));
    } catch (error) {
        res.status(401).json({message: 'Failed to update contact please try again'})
    };
});


// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ CREATE ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ 
router.post('/', async (req, res) => {
    try {
        console.log(req.body, 'THIS IS REQ DOT BODY')
        res.json(await Contact.create(req.body));
    } catch (error) {
        res.status(401).json({message: 'Please login to create a contact'});
    }
});
// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ NOTES ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ 
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
router.post('/search', async (req, res) => {
    const allContacts = await Contact.find({
        firstName: req.body.query,
        lastName: req.body.query})
    if(!allContacts || allContacts.length === 0) res.status(400).send({error: 'No item found'})
    res.json(allContacts)
  })

// Export the router object
module.exports = router;