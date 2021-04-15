const Account = require('mongoose').model('Account');
const Patient = require('mongoose').model('Patient');
const MotivationalTip = require('mongoose').model('MotivationalTip');

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

    Patient.find({nurse: req.user}, (err, patients) => {
        if (err) {
            res.status(500).send({msg: 'Error Fetching all Nurses', err: err});
        } else {
            res.status(200).send(patients);
        }
    }).populate('account').select("-password");
}

exports.addMotivationalTip = async (req, res) => {

    let motivationalTip = new MotivationalTip(req.body);

    await motivationalTip.save((err, tip) => {
        if (err) {
            res.status(500).send({msg: 'server error', err: err});
        } else {
            res.status(200).send(tip);
        }
    });
}
