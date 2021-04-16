const Patient = require('mongoose').model('Patient');
const VitalSign = require('mongoose').model('VitalSign');
const EmergencyAlert = require('mongoose').model('EmergencyAlert');
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

exports.getPatientDetailsById = (req, res) => {
    console.log(req.patient);
    res.status(200).send(req.patient);
}

exports.getPatientByIdDetail = (req, res, next, id) => {
    console.log("middleware called");
    Patient.findById(id, (err, patient) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Server Error', err: err}).end();
        } else {
            if (patient) {
                req.patient = patient;
                next();
            } else {
                res.status(404).send({message:"patient not found"}).end();
            }
        }
    }).populate(['account', 'vitalSigns', 'emergencyAlerts', 'motivationalTips', 'nurse', 'clinicalData']);
}

exports.getPatientById = (req, res, next, id) => {
    console.log("middleware called");
    Patient.findById(id, (err, patient) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Server Error', err: err}).end();
        } else {
            if (patient) {
                req.patient = patient;
                next();
            } else {
                res.status(404).send({message:"patient not found"}).end();
            }
        }
    });
}

exports.getLatestMotivationalTip = (req, res) => {
    console.log(req.user);

    Patient.findOne({account: req.user.id}, (err, patient) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Server Error', err: err}).end();
        } else {
            if (patient) {
                console.log(patient);
                if (patient.motivationalTips.length !== 0) {
                    res.status(200).send(patient.motivationalTips[patient.motivationalTips.length - 1]);
                } else {
                    res.status(200).send(null);
                }
            } else {
                res.status(404).send({message:"patient not found"}).end();
            }
        }
    }).populate('motivationalTips');
}

exports.sendEmergencyAlert = async (req, res) => {

    Patient.findOne({account: req.user.id}, (err, patient) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'Server Error', err: err}).end();
        } else {
            if (patient) {
                let emergencyAlert = new EmergencyAlert(req.body);

                emergencyAlert.save((err, alert) => {
                    if (err) {
                        res.status(500).send({msg: 'server error', err: err}).end();
                    } else {
                        if (alert) {
                            console.log(patient.emergencyAlerts);
                            patient.emergencyAlerts.push(alert);
                            Patient.findByIdAndUpdate(patient._id, patient, (err, pat) => {
                                if (err) {
                                    res.status(500).send({msg: 'server error', err: err}).end();
                                } else {
                                    res.status(200).send({msg: 'successfully added alert', patient: pat});
                                }
                            })
                        } else {
                            res.status(500).send({msg: 'server error clinical data not creates'}).end();
                        }
                    }
                });
            } else {
                res.status(404).send({message:"patient not found"}).end();
            }
        }
    }).populate('emergencyAlerts');
}
