// Load the module dependencies
const Account = require('mongoose').model('Account');
const Patient = require('mongoose').model('Patient');
const Nurse = require('mongoose').model('Nurse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 60 * 60 * 2;
const jwtKey = config.secretKey;

exports.authenticate = function(req, res, next) {
    const userName = req.body.auth.username;
    const password = req.body.auth.password;

    // finding the account of user
    Account.findOne({username: userName}, (err, user) => {
        if (err) {
            return next(err);
        } else {

            // compare passwords
            if (bcrypt.compareSync(password, user.password)) {
                // create payload
                const payload = {
                    id: user._id,
                    username: user.username
                }
                // Create token with the id of the user in the payload and expires as per jwtExpirySeconds
                const token = jwt.sign(payload, jwtKey, 
                            {
                                algorithm: 'HS256', expiresIn: jwtExpirySeconds
                            }
                );
                
                res.cookie('token', token, { maxAge: jwtExpirySeconds, httpOnly: true});
                res.status(200).send({ screen: user.username });

                req.user = user;
                next();
            } else {
                res.json({ status: 'error', message: 'Invalid username/password', data: null });
            }
        }
    });
};

