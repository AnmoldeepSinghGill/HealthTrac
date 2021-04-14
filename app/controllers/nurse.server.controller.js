const Account = require('mongoose').model('Account');

exports.getAllNurses = async (req, res) => {

    Account.find({accountType: 'NURSE'}, (err, accounts) => {
        if (err) {
            res.status(500).send({msg: 'Error Fetching all Nurses', err: err});
        } else {
            res.status(200).send(accounts);
        }
    }).select('-password');
}
