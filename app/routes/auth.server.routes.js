const authController = require('../controllers/auth.server.controller');

// Define the routes module' method
module.exports = function (app) {


    app.post('/api/signin', authController.loginUser);
    app.get('/api/signout', authController.signOut);
    app.get('/api/auth', authController.isLoggedInUser);
    
};