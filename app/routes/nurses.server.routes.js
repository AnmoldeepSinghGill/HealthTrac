const nursesController = require("../controllers/nurse.server.controller");

module.exports = function (app) {

    // get all the nurses list
    app.get("/api/nurses", nursesController.getAllNurses);
}
