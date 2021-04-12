const userController = require('../controllers/users.server.controller');

// Define the routes module' method
module.exports = function (app) {
    
    //handle a post request made to root path
    app.post('/api/users', userController.createUser);
    
};