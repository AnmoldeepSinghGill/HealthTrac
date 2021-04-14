const Patient = require('mongoose').model('Patient');
const VitalSign = require('mongoose').model('VitalSign');
const ObjectId = require('mongodb');

exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({ account: req.user.id });
        res.json(patient);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.createVitalSigns = async (req, res) => {

    const { pulseRate, bloodPressure, weight, temperature, respiratoryRate, createdBy } = req.body;
    console.log('From createVitalSigns ', req.body);
    try {
        const newVitalSign = new VitalSign({
            pulseRate, bloodPressure, weight, temperature, respiratoryRate, createdBy
        });

        const vitalSign = await newVitalSign.save();

        let patient = await Patient.findOne({ account : req.user.id});
        

        patient = await Patient.findByIdAndUpdate(patient._id,
            { $push: {"vitalSigns": vitalSign._id}},
            {upsert: true, new: true});
        
        res.json(vitalSign);
            
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
}