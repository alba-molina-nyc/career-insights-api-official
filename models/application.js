// Require dependencies
const { urlencoded } = require('express');
const mongoose = require('mongoose');
// Create Schema shortcut variable
const Schema = mongoose.Schema;
// Define the Schema

const todoSchema = new Schema({
    content: String,
    createdBy: String
}, { timestamps: true });

const applicationSchema = new Schema({
    title: String,
    jobPost: String,
    companyName: String,
    location: String, 
    salary: String,
    industry: String,
    companySize: String,
    submissionStatus: String,
    dueDate: String,
    nextSteps: String,
    remote:{
        type: Boolean,
        default: false
    },
    managedBy: String, 
    todos: [todoSchema]
}, { timestamps: true });


// Export the result of compiling the Schema into a model
module.exports = mongoose.model('Application', applicationSchema);