// Load the Mongoose module and Schema object
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a new 'VitalSign'
const ClinicalDataSchema = new Schema({
    age: Number,
    sex: Number,
    cp: Number,
    trestbps: Number,
    chol: Number,
    fbs: Number,
    restecg: Number,
    thalach: Number,
    exang: Number,
    oldpeak: Number,
    slope: Number,
    ca: Number,
    thal: Number,
    riskCategory: Number,
    createdOn: {
        type: Date,
        default: new Date()
    },
});

// Configure the 'ClinicalDataSchema' to use getters and virtuals when transforming to JSON
ClinicalDataSchema.set("toJSON", {
    getters: true,
    virtuals: true,
});

// Create the 'ClinicalData' model out of the 'ClinicalDataSchema'
mongoose.model("ClinicalData", ClinicalDataSchema);
