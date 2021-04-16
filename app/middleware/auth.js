// This function will be used for checking the logged in user's token
// and will be passed with the private routes.

/**
 * Name: Anmoldeep Singh Gill, Mohammad bakir, Alvin Yap, Kharak Kular
 * Student Number: 301044883, 300987420, 301041207, 301042015
 */

const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = function( req, res, next) {
    // Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.header('x-auth-token');
    console.log(token);
    // check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    try{
        // verify the token
        const decoded = jwt.verify(token, config.secretKey);
        
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
}
