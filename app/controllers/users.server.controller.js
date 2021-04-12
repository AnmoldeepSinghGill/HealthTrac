// Load the module dependencies
const Account = require('mongoose').model('Account');
const Patient = require('mongoose').model('Patient');
const Nurse = require('mongoose').model('Nurse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 60 * 60 * 2;
const jwtKey = config.secretKey;

// @route    GET  api/users
// @desc     Post for register a user (Nurse/ Patient)
// @access   Public
exports.createUser = async (req, res) => {
    
    const {studentNumber, firstName, lastName, email, password, address, city, phoneNumber, accountType } = req.body;
    console.log(req.body);
    try {
        let user = await Account.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists'});
        }
        // let tempStudentNumber = parseInt(studentNumber);
        // console.log("Student number is ", tempStudentNumber);
        user = new Account({
            studentNumber ,
            firstName,
            lastName,
            email,
            password,
            address,
            city,
            phoneNumber,
            accountType
        });

        await user.save();

        const payload = {
            user: {
                id: user._id
            }
        }

        // Create token with the id of the user in the payload and expires as per jwtExpirySeconds
        jwt.sign(payload, jwtKey, 
            {
                algorithm: 'HS256', expiresIn: jwtExpirySeconds
            },
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.json({ token });
            }
        );

    } catch(err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
};
