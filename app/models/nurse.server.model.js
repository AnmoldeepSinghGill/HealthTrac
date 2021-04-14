// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a new 'Nurse Schema'
const NurseSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  }
});

// Configure the 'NurseSchema' to use getters and virtuals when transforming to JSON
NurseSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

// Create the 'Nurse' model out of the 'NurseSchema'
mongoose.model("Nurse", NurseSchema);
