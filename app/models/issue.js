'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let issueSchema = new Schema({
    issueId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    assignedTo: {
        type: []
    },
    screenshot: {
        type: String,
        default: ''
    },
    watchersList: {
        type: []
    },
    status: {
        type: String,
        default: 'done'
    },
    reportedBy: {
        type: String,
        default: ''
    },
    reportedByUserId:{
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
})
mongoose.model('Issue', issueSchema);