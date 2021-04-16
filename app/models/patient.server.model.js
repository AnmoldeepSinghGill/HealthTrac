// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a new 'Patient Schema'
const PatientSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  vitalSigns: [
    {
      type: Schema.Types.ObjectId,
      ref: "VitalSign",
    },
  ],
  emergencyAlerts: [
    {
      type: Schema.Types.ObjectId,
      ref: "EmergencyAlert",
    },
  ],
  motivationalTips: [
    {
      type: Schema.Types.ObjectId,
      ref: "MotivationalTip",
    },
  ],
  clinicalData: [
    {
      type: Schema.Types.ObjectId,
      ref: "ClinicalData",
    },
  ],
  nurse: {
    type: Schema.Types.ObjectId,
    ref: "Nurse",
  }
});

// Configure the 'PatientSchema' to use getters and virtuals when transforming to JSON
PatientSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

// Create the 'Account' model out of the 'AccountSchema'
mongoose.model("Patient", PatientSchema);
