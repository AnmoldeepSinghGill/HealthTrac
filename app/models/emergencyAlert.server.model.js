// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a new 'EmergencyAlertSchema'
const EmergencyAlertSchema = new Schema({
  reason: String,
  notified: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: new Date()
  }
});

// Configure the 'EmergencyAlertSchema' to use getters and virtuals when transforming to JSON
EmergencyAlertSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

// Create the 'EmergencyAlert' model out of the 'EmergencyAlertSchema'
mongoose.model("EmergencyAlert", EmergencyAlertSchema);
