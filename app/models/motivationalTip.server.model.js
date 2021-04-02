// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a new 'Patient Schema'
const MotivationalTipSchema = new Schema({
  type: String,
  videoLink: String,
});

// Configure the 'MotivationalTipSchema' to use getters and virtuals when transforming to JSON
MotivationalTipSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

// Create the 'MotivationalTip' model out of the 'MotivationalTipSchema'
mongoose.model("MotivationalTip", MotivationalTipSchema);
