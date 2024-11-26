/*

_id": "650c1f1e1c9d440000a1b1c1", 
"title": "Complete project documentation", 
"description": "Write the documentation for the project", 
"status": "In Progress",
 "priority": "High", 
 "dueDate": "2021-01-10T00:00:00.000Z", 
 "dateCreated": "2021-01-01T00:00:00.000Z", 
"dateModified": "2021-01-05T00:00:00.000Z",
 "projectId": 1000

Constraints
title in the Tasks collection must be unique 
status in the Tasks collection must be one of the following, “Pending”, “In Progress”, “Completed”.  
priority in the Tasks collection must be one of the following: “Low”, “Medium”, “High”.  

*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
    minlength: [3, "Task title must be at least 3 characters"],
    maxlength: [100, "Task title cannot exceed 100 characters"],
    unique: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    required: [true, "Task status is required"],
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: [true, "Task type is required"],
  },
  dueDate: {
    type: Date,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
  projectId: {
    type: Number,
    required: [true, "Project ID is required"],
  },
});

taskSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.dateModified = new Date();
  }
  next();
});

module.exports = {
  Task: mongoose.model("Task", taskSchema),
};

