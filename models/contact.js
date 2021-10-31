const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    companyName: String,
    role: String,
    lastContacted: Date,
    managedBy: String, // <= the google firebase user's uid number
    // notes: [noteSchema]
}, { timestamps: true });


module.exports = mongoose.model('Contact', contactSchema);