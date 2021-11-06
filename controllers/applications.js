// Require dependencies
const express = require('express');
const Application = require('../models/application');
// Create router object
const router = express.Router();

// Define routes/controllers

// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ INDEX ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏
router.get('/', async (req, res) => {
    try {
        res.json(await Application.find({managedBy: req.user.uid}));
    } catch (error) {
        res.status(401).json({message: 'Please login to see applications'});
    }
});
// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ DELETE ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ 
router.delete('/', async (req, res) => {
    try {
        res.json(await Application.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(401).json({message: 'Failed to delete application please try again'})
    }
});

// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ UPDATE ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ 
router.put('/', async (req, res) => {
    try {
        res.json(await Application.findByIdAndUpdate(req.params.id, req.body, {new: true}
            ));
    } catch (error) {
        res.status(401).json({message: 'Failed to update application please try again'})
    };
});

// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ CREATE ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        res.json(await Application.create(req.body));
    } catch (error) {
        res.status(401).json({message: 'Please login to create an Application'});
    }
});
// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ TODOS ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏
router.post('/:id/todos', async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        application.todos.push(req.body); // pushes the data into the notes array in memory only
        await todo.save(); // we call save to persist the changes in MongoDB
        res.json(todo);
    } catch (error) {
        res.status(401).json({message: 'Sorry Something Went Wrong'});
    }
});

// ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️ SEARCH ROUTE ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏
router.post('/search', async (req, res) => {
    // console.log('we are here')
    const allContacts = await Contact.find({
        firstName: req.body.query,
        lastName: req.body.query})
    if(!allContacts || allContacts.length === 0) res.status(400).send({error: 'No item found'})
    res.json(allContacts)
})



// Export the router object
module.exports = router;