const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let assignSchema = new Schema({
    assigneeId: {
        type: String,
        required: true,
        index: true,
    }, 
    issueId: {
        type: String,
        required: true
    },
    assignedById: {
        type: String,
    },
    assignedToId: {
        type: String,
        required: true
    },
    assignedToName: {
        type: String,
        required: true
    },
    assignedOn: {
        type: Date,
        default: ''
    }
});

module.exports = mongoose.model("Assignee", assignSchema);