const addProjectSchema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 100 },
      description: { type: "string", maxLength: 500 },
      dateCreated: {
        type: "string",
        pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
    },
    required: ["name"],
    additionalProperties: false,
  };
  
  const updateProjectSchema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 100 },
      description: { type: "string", maxLength: 500 },
    },
    required: ["name"],
    additionalProperties: false,
  };
  
  const addTaskSchema = {
    type: "object",
    properties: {
      title: { type: "string", minLength: 3, maxLength: 100 },
      type: { type: "string", enum: ["Pending", "In Progress", "Completed"] },
      status: { type: "string", enum: ["Pending", "In Progress", "Completed"] },
      datePlanted: {
        type: "string",
        pattern: "^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$",
      },
    },
    required: ["name", "type", "status"],
    additionalProperties: false,
  };
  
  const updateTaskSchema = {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3, maxLength: 100 },
      type: { type: "string", enum: ["Pending", "In Progress", "Completed"] },
      status: { type: "string", enum: ["Pending", "In Progress", "Completed"] },
    },
    required: ["name", "type", "status"],
    additionalProperties: false,
  };
  
  module.exports = {
    addProjectSchema,
    updateProjectSchema,
    addTaskSchema,
    updateTaskSchema,
  };


