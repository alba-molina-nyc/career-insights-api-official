const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trackerSchema = new Schema({
    responsibilities: String, 
    goalsKPIs: String, 
    achievements: String, 
    references: String, 
    comments: String
}, { timestamps: true });

const roadmapSchema = new Schema({
    goal: String, 
    howContent: String,
    actionableTasks: String,
    dueData: Date,
    status: String, 
    newProficiencyRanking: Number,
    comments: String,
    tracker: [trackerSchema]
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);