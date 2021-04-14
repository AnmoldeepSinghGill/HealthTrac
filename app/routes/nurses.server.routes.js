const nursesController = require("../controllers/nurse.server.controller");
const auth = require('../middleware/auth');

module.exports = function (app) {

    // get all the nurses list
    app.get("/api/nurses", nursesController.getAllNurses);

    app.get("/api/getPatientsForNurse", auth,  nursesController.getAllNurses);

    app.post("/api/addMotivationalTip", nursesController.addMotivationalTip);
}
