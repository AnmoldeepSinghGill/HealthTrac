// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a new 'VitalSign'
const VitalSignSchema = new Schema({
  pulseRate: Number,
  bloodPressure: String,
  weight: Number,
  temperature: Number,
  respiratoryRate: Number,
  createdBy: {
    type: String,
    enum: ["PATIENT", "NURSE", "CLINICALVISIT"],
    default: "PATIENT",
  },
});

// Configure the 'VitalSignSchema' to use getters and virtuals when transforming to JSON
VitalSignSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

// Create the 'VitalSign' model out of the 'VitalSignSchema'
mongoose.model("VitalSign", VitalSignSchema);
