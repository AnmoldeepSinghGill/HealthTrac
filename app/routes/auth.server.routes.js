const authController = require('../controllers/auth.server.controller');
const auth = require('../middleware/auth');

// Define the routes module' method
module.exports = function (app) {


    app.post('/api/signin', authController.loginUser);
    app.get('/api/auth', auth, authController.isLoggedInUser);
    
};