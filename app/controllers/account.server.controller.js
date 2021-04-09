const Account = require('mongoose').model('Account');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;


// Create a new error handling controller method
const getErrorMessage = function(err) {
	// Define the error message variable
	var message = '';

	// If an internal MongoDB error occurs get the error message
	if (err.code) {
		switch (err.code) {
	
			// If a general error occurs set the message error
			default:
				message = 'Something went wrong';
		}
	} else {
		// Grab the first error message from a list of possible errors
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	// Return the message error
	return message;
};


exports.create = function (req, res, next) {
	
    // Create a new instance of the 'Account' Mongoose model
    var account = new Account(req.body); //get data from React form
    console.log("body: " + req.body.accountNumber);

    // Use the 'Account' instance's 'save' method to save a new student document
    account.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(account);
            
        }
    });
};

// authenticates a student
exports.authenticate = function(req, res, next) {
	// Get credentials from request
	console.log(req.body)
	const accountNumber = req.body.auth.accountNumber;
	const password  = req.body.auth.password;
	console.log(password)
	console.log(accountNumber)
	try{
	//find the student with given studentNumber using static method findOne
	Account.findOne({accountNumber: accountNumber}, (err, account) => {
			if (err) {
				return next(err);
			} else {
			console.log(account)
			//compare passwords	
			if(bcrypt.compareSync(password, account.password)) {
				// Create a new token with the student id in the payload
  				// and which expires 300 seconds after issue
				const token = jwt.sign({ id: account._id, account: student.accountNumber }, jwtKey, 
					{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
				console.log('token:', token)
				// set the cookie as the token string, with a similar max age as the token
				// here, the max age is in milliseconds
				res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
				res.status(200).send({ screen: account.accountNumber});
				//
				//res.json({status:"success", message: "Account found!!!", data:{account:
				//account, token:token}});
				
				req.account=account;
				//call the next middleware
				next()
			} else {
				res.json({status:"error", message: "Invalid account number/password!!!",
				data:null});
			}
			
		}
		
	});}catch (err){
		console.log(err);
	}
};

exports.welcome = (req, res) => {
	// We can obtain the session token from the requests cookies,
	// which come with every request
	try{
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.status(401).end()
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
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, return the welcome message to the student, along with their
	// studentNumber given in the token
	// use back-quotes here
	res.send(`${payload.accountNumber}`)
	}catch(e){
		console.log(e);
	}
 };


 exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
	// Redirect the student back to the main application page
	//res.redirect('/');
}


exports.isSignedIn = (req, res) => {
	// Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return 'auth'
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
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
  
	// Finally, token is ok, return the studentNumber given in the token
	res.status(200).send({ screen: payload.accountNumber });
};


exports.requiresLogin = function (req, res, next) {
    // Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.students.requiresLogin,
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	  console.log('in requiresLogin - payload:',payload)
	  req.id = payload.id;
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
	// student is authenticated
	//call next function in line
    next();
};