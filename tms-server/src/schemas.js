/*
title in the Tasks collection must be unique
 1. A task must have a title, status, and priority 
2. A project must have a name and a start date 
3. The status of a task can only be one of the following: “Pending”, “In Progress”, “Completed” 
4. The priority of a task can only be one of the following: “Low”, “Medium”, “High” 
5. The startDate of a project must be a valid date 


6. The endDate of a project, if provided, must be a valid date and must be after the startDate 


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
  },
  endDate: {
    type: Date,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
*/

const addProjectSchema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 100 },
      description: { type: "string", maxLength: 500 },
      
      //The startDate of a project must be a valid date 
      startDate: {
        type: "string",
        pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
      // verify valid enddate
      endDate: {
        type: "string",
        pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
      dateCreated: {
        type: "string",
        pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
      dateModified: {
        type: "string",
        pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
    },
    //A project must have a name and a start date 
    required: ["name", "startDate", "endDate"],
    additionalProperties: false,
  };
  
  const updateProjectSchema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 100 },
      description: { type: "string", maxLength: 500 },
      //The startDate of a project must be a valid date 
      startDate: {
        type: "string",
        pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
      // verify valid endate
      endDate: {
        type: "string",
        pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },

    },
    //A project must have a name and a start date 
    required: ["name", "startDate", "endDate"],
    additionalProperties: false,
  };
  
  const addTaskSchema = {
    type: "object",
    properties: {
      title: { type: "string", minLength: 3, maxLength: 100 },
      // The status of a task can only be one of the following: “Pending”, “In Progress”, “Completed” 
      status: { type: "string", enum: ["Pending", "In Progress", "Completed"] },
      //The priority of a task can only be one of the following: “Low”, “Medium”, “High” 
      priority: { type: "string", enum: ["Low", "Medium", "High"] },
      date: {
        type: "string",
        pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },

    },
    //A task must have a title, status, and priority 
    required: ["title", "status", "priority"],
    additionalProperties: false,
  };
  
  const updateTaskSchema = {
    type: "object",
    properties: {
      title: { type: "string", minLength: 3, maxLength: 100 },
      status: { type: "string", enum: ["Pending", "In Progress", "Completed"] },
      priority: { type: "string", enum: ["Low", "Medium", "High"] },
    },
    required: ["title", "type", "status"],
    additionalProperties: false,
  };
  
  module.exports = {
    addProjectSchema,
    updateProjectSchema,
    addTaskSchema,
    updateTaskSchema,
  };


