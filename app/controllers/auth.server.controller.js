// Load the module dependencies
const Account = require('mongoose').model('Account');
const Patient = require('mongoose').model('Patient');
const Nurse = require('mongoose').model('Nurse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 60 * 60 * 2;
const jwtKey = config.secretKey;

// @route    GET  api/auth
// @desc     Get logged in user
// @access   Private
exports.isLoggedInUser = async (req, res) => {
  
	try {
	  const user = await Account.findById(req.user.id).select('-password');
    res.json(user);
	} catch (e) {
	  console.error(e.message);
    res.status(500).send('Server Error');
	}
  
};

// @route    GET  api/login
// @desc     Auth user & get token
// @access   Public
exports.loginUser =  async (req, res) => {
    
    // Get email and password from body
    const { email, password } = req.body;

    try{

      let user = await Account.findOne({ email });
      // Checks to see if the user is not null
      if(!user) {
          return res.status(400).json({ msg: 'Invalid Credentials'});
      }
      // matches the password of user with the stored password
      const isMatch = await bcrypt.compare(password, user.password);
      // reports invalid if password doesn't match
      if (!isMatch) {
          return res.status(400).json({ msg: 'Invalid Credentials'});
      }

      const payload = {
        user:{
          id: user._id
        }     
      }

      // Create token with the id of the user in the payload and expires as per jwtExpirySeconds
      jwt.sign(payload, jwtKey, 
          {
              algorithm: 'HS256', expiresIn: jwtExpirySeconds
          },
          (err, token ) => {
            if (err) {
              throw err;
            }
            res.json({ token });
          }
      );
      
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
