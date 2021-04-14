const accounts = require('../controllers/accounts.server.controller');
const auth = require('../middleware/auth');

module.exports = function (app) {

    // used for signing in a user (patient/nurse)
    app.post('/api/signIn', accounts.loginUser);

    // used for getting the user details
    app.get('/api/auth', auth, accounts.isLoggedInUser);

    // used to register a new patient
    app.post('/api/createAccount', accounts.createAccount);
}
