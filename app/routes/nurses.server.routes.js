const nursesController = require("../controllers/nurse.server.controller");
const auth = require('../middleware/auth');

module.exports = function (app) {

    // get all the nurses list
    app.get("/api/nurses", nursesController.getAllNurses);

    app.get("/api/getPatientsForNurse", auth, nursesController.getAllPatientsByNurseId);

    app.post("/api/addMotivationalTip/:patId", nursesController.addMotivationalTip);
    app.post("/api/addVitalSigns/:patId", auth, nursesController.addVitalSign);
    app.post("/api/addClinicalData/:patId", auth, nursesController.addClinicalData);
}
