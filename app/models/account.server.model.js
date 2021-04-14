// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Schema = mongoose.Schema;

// Define a new 'Account Schema'
const AccountSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    // Set an email index
    index: true,
    // Validate the email format
    match: /.+\@.+\..+/,
    unique: true,
  },
  password: {
    type: String,
    // Validate the 'password' value length
    validate: [(password) => password.length >= 6, "Password Should Be Longer"],
  },
  address: String,
  city: String,
  phoneNumber: String,
  accountType: {
    type: String,
    enum: ["PATIENT", "NURSE"],
    default: "PATIENT",
  },
});

// Use a pre-save middleware to hash the password
// before saving it into database
AccountSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
AccountSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

// Create the 'Account' model out of the 'AccountSchema'
mongoose.model("Account", AccountSchema);
