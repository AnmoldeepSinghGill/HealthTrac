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
    // Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return 'auth'
	if (!token) {
	  return res.status(401).json({ msg: 'No token, authorization denied' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, token is ok, return the username given in the token
	res.status(200).json({ token });
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
                    id: user._id
        }

        // Create token with the id of the user in the payload and expires as per jwtExpirySeconds
        const token = jwt.sign(payload, jwtKey, 
            {
                algorithm: 'HS256', expiresIn: jwtExpirySeconds
            }
        );
        
        res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
		res.status(200).json({ token });
				
		req.user=user;

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route    GET  api/logout
// @desc     Logout user
// @access   Public
exports.signOut = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'signed out' });
}