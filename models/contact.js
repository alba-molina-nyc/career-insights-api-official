// Require dependencies
const mongoose = require('mongoose');
// Create Schema shortcut variable
const Schema = mongoose.Schema;
// Define the Schema

// const noteSchema = new Schema({
//     content: String,
//     createdBy: String,
   
// }, { timestamps: true });

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

// Export the result of compiling the Schema into a model
module.exports = mongoose.model('Contact', contactSchema);