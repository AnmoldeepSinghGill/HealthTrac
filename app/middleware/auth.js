// This function will be used for checking the logged in user's token
// and will be passed with the private routes.

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function( req, res, next) {
    // Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token

    // check if not token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    try{
        // verify the token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}