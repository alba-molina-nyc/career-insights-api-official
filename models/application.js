const { urlencoded } = require('express');

const mongoose - require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    jobTitle: String,
    jobPost: String,
    companyName: String,
    industry: String, 
    companySize: Number,
    rating: Range,
    type: String,
    remote: {
        type: Boolean,
        default: false
    },
    location: String,
    paid: {
        type: Boolean,
        default: false
    },
    salary: Number,
    submissionStatus: String, 
    dueDate: Date,
    resume: String, 
    coverLetter: String, 
    references: String, 
    nextSteps: String, 
    notes: [noteSchema]
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);

