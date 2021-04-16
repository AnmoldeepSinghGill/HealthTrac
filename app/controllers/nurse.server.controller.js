const mongoose = require('mongoose')
const Account = require('mongoose').model('Account');
const Patient = require('mongoose').model('Patient');
const MotivationalTip = require('mongoose').model('MotivationalTip');
const VitalSign = require('mongoose').model('VitalSign');
const ClinicalData = require('mongoose').model('ClinicalData');


exports.getAllNurses = async (req, res) => {

    Account.find({accountType: 'NURSE'}, (err, accounts) => {
        if (err) {
            res.status(500).send({msg: 'Error Fetching all Nurses', err: err});
        } else {
            res.status(200).send(accounts);
        }
    }).select('-password');
}

exports.getAllPatientsByNurseId = async (req, res) => {
    console.log(req.user);
    Patient.find({nurse: req.user.id}, (err, patients) => {
        if (err) {
            res.status(500).send({msg: 'Error Fetching Patients for Nurses', err: err});
        } else {
            res.status(200).send(patients);
        }
    }).populate('account').select( "password");
}

exports.addMotivationalTip = async (req, res) => {
    console.log(req.patient);
    req.body.videoLink = req.body.videoLink.replace('watch?v=', 'embed/');
    let motivationalTip = new MotivationalTip(req.body);

    await motivationalTip.save((err, tip) => {
        if (err) {
            res.status(500).send({msg: 'server error', err: err});
        } else {
            if (tip) {
                let pat = req.patient;
                pat.motivationalTips.push(tip);
                Patient.findByIdAndUpdate(req.patient._id, pat, (err, patient) => {
                    if (err) {
                        res.status(500).send({msg: 'server error', err: err}).end();
                    } else {
                        res.status(200).send({msg: 'successfully updated', patient: patient});
                    }
                })
            } else {
                res.status(500).send({msg: 'server error motivational tip not created'}).end();
            }
        }
    });
}

exports.addVitalSign = async (req, res) => {
    console.log(req.patient);
    let vitalSign = new VitalSign(req.body);

    await vitalSign.save((err, sign) => {
        if (err) {
            res.status(500).send({msg: 'server error', err: err});
        } else {
            if (sign) {
                let pat = req.patient;
                pat.vitalSigns.push(sign);
                Patient.findByIdAndUpdate(req.patient._id, pat, (err, patient) => {
                    if (err) {
                        res.status(500).send({msg: 'server error', err: err}).end();
                    } else {
                        res.status(200).send({msg: 'succesfully updated', patient: patient});
                    }
                })
            } else {
                res.status(500).send({msg: 'server error vital signs not created'}).end();
            }
        }
    });
}

exports.addClinicalData = async (req, res,) => {
    console.log(req.patient);

    let clinicalData = new ClinicalData(req.body);

    await clinicalData.save((err, data) => {
        if (err) {
            res.status(500).send({msg: 'server error', err: err}).end();
        } else {
            if (data) {
                let pat = req.patient;

                

                pat.clinicalData.push(data);
                Patient.findByIdAndUpdate(req.patient._id, pat, (err, patient) => {
                    if (err) {
                        res.status(500).send({msg: 'server error', err: err}).end();
                    } else {
                        res.status(200).send({msg: 'succesfully updated', patient: patient});
                    }
                })
            } else {
                res.status(500).send({msg: 'server error clinical data not creates'}).end();
            }
        }
    });
}

exports.getAllMotivationalTips = async (req, res) => {
    MotivationalTip.find({}, (error, tips) => {
        if (error) {
            res.status(500).send({msg: 'server error', err: error}).end();
        } else {
            res.status(200).send(tips);
        }
    })
}

exports.updatePatientMotivationalTip = async (req, res) => {
    console.log(req.patient);

    let pat = req.patient;
    const tipId = new mongoose.Types.ObjectId(req.body.id);
    pat.motivationalTips.push(tipId);
    Patient.findByIdAndUpdate(req.patient._id, pat, (err, patient) => {
        if (err) {
            res.status(500).send({msg: 'server error', err: err}).end();
        } else {
            res.status(200).send({msg: 'successfully updated', patient: patient});
        }
    })
}
