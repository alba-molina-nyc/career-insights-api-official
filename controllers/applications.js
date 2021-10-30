// Require dependencies
const express = require('express');
const Application = require('../models/application');
// Create router object
const router = express.Router();

router.get('/applications', async (req, res) => {
    try {
        res.json(await Application.find({managedBy: req.user.uid}));
    } catch (error) {
        res.status(401).json({message: 'Please login to see applications'});
    }
});

module.exports = router;