const nursesController = require("../controllers/nurse.server.controller");
const auth = require('../middleware/auth');

module.exports = function (app) {

    // get all the nurses list
    app.get("/api/nurses", nursesController.getAllNurses);

    app.get("/api/getPatientsForNurse", auth, nursesController.getAllPatientsByNurseId);
    app.get("/api/getAllMotivationalTips", nursesController.getAllMotivationalTips);

    app.post("/api/addMotivationalTip/:patId", nursesController.addMotivationalTip);
    app.post("/api/addPatientVitalSigns/:patId", auth, nursesController.addVitalSign);
    app.post("/api/addClinicalData/:patId", auth, nursesController.addClinicalData);

    app.post("/api/updatePatientMotivationalTip/:patId", nursesController.updatePatientMotivationalTip);
}
