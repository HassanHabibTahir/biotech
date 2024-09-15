const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Function to map string types to Mongoose schema types
const mapType = (type) => {
  switch (type.toLowerCase()) {
    case "string":
      return String;
    case "number":
      return Number;
    case "date":
      return Date;
    case "boolean":
      return Boolean;
    case "objectid":
      return mongoose.Schema.Types.ObjectId;
    // Add more types if necessary
    default:
      throw new Error(`Invalid type: ${type}`);
  }
};

// API to dynamically create or update a schema
router.post("/create-schema", (req, res, next) => {
  const { schemaName, fields } = req.body;

  try {
    if (!schemaName || !fields) {
      return res.status(400).send({ error: "Missing schemaName or fields" });
    }

    // Construct the schema definition
    const schemaDefinition = {};
    fields.forEach((field) => {
      const { name, type, required } = field;
      if (!name || !type) {
        throw new Error("Each field must have a name and type");
      }
      schemaDefinition[name] = {
        type: mapType(type),
        required: !!required,
      };
    });

    // Check if the model already exists
    let Model;
    if (mongoose.models[schemaName]) {
      Model = mongoose.models[schemaName]; // Use existing model
    } else {
      // Create a new schema and model
      const schema = new mongoose.Schema(schemaDefinition);
      Model = mongoose.model(schemaName, schema);
    }

    res.send({ message: `Schema created/updated for collection: ${schemaName}` });
  } catch (error) {
    res.status(500).send({ error: "Error creating schema", details: error.message });
  }
});

// API to insert dummy data into the created schema
router.post("/insert-data", async (req, res) => {
  const { schemaName, data } = req.body;

  try {
    if (!schemaName || !data) {
      return res.status(400).send({ error: "Missing schemaName or data" });
    }

    // Check if the model exists in mongoose models
    const Model = mongoose.models[schemaName];
    if (!Model) {
      return res.status(400).send({ error: `Schema ${schemaName} not found. Create schema first.` });
    }

    // Insert the dummy data
    const insertedData = await Model.create(data);
    res.send({ message: "Data inserted successfully", data: insertedData });
  } catch (error) {
    res.status(500).send({ error: "Error inserting data", details: error.message });
  }
});

module.exports = router;
