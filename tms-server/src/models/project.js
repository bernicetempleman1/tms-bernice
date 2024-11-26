/*
Project:
"_id": "650c1f1e1c9d440000a1b1c1", 
"projectId": 1000, 
"name": "Project Alpha", 
"description": "Initial phase of the project", 
"startDate": "2021-01-01T00:00:00.000Z", 
"endDate": "2021-06-01T00:00:00.000Z",
"dateCreated": "2021-01-01T00:00:00.000Z", 
"dateModified": "2021-01-05T00:00:00.000Z" 

constraints:
startDate in the Projects collection must be a valid date 
endDate in the Projects collection, if provided, must be a valid date and be after the startDate

Business rules
1. A task belongs to one project 
2. A project can have many tasks 
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the counter schema
let counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

// Create a counter model
const Counter = mongoose.model("Counter", counterSchema);

// Define the garden schema
let projectSchema = new Schema({
  projectId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Project name is required"],
    minlength: [3, "Project name must be at least 3 characters"],
    maxlength: [100, "Project name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
});

// Custom validator
projectSchema.path("name").validate(function (val) {
  return /^[A-Za-z\s]+$/.test(val); // Only allows letters and spaces
}, "Project name can only contain letters and spaces");

// Pre-save hook to increment the gardenId
// If the document is new, increment the gardenId
// If the document is not new, update the dateModified
projectSchema.pre("validate", async function (next) {
  if (this.startDate < this.endDate) {
    let doc = this;
    if (this.isNew) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: "projectId" },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        doc.projectId = counter.seq;
        next();
      } catch (err) {
        console.error("Error in Counter.findByIdAndUpdate:", err);
        next(err);
      }
    } else {
      doc.dateModified = new Date();
      next();
    }
  } else {
    console.error("Error in start date");
    next(new Error("End Date must be greater than Start Date"));
  }
});

module.exports = {
  Project: mongoose.model("Project", projectSchema),
  Counter: mongoose.model("Counter", counterSchema),
};
