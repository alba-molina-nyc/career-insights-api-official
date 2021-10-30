const express = require('express');
const Roadmap = require('../models/roadmap');
// Create router object
const router = express.Router();
router.get('/roadmap', async (req, res) => {
    try {
        res.json(await Roadmap.find({managedBy: req.user.uid}));
    } catch (error) {
        res.status(401).json({message: 'Please login to see roadmap'});
    }
});

module.exports = router;