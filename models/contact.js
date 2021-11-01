const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    content: String,
    createdBy: String
}, { timestamps: true });

const contactSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    companyName: String,
    role: String,
    lastContacted: Date,
    managedBy: String, 
    notes: [noteSchema]
}, { timestamps: true });


module.exports = mongoose.model('Contact', contactSchema);