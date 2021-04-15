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
    let motivationalTip = new MotivationalTip(req.body);

    await motivationalTip.save((err, tip) => {
        if (err) {
            res.status(500).send({msg: 'server error', err: err});
        } else {
            res.status(200).send(tip);
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
