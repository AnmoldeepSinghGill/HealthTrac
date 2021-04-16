const patientController = require('../controllers/patient.server.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {

    app.get('/api/patient', auth, patientController.getPatient);
    app.post('/api/patient', auth, patientController.createVitalSigns);

    app.get("/api/patientDetails/:patientId", auth, patientController.getPatientDetailsById);

    app.post("/api/sendEmergencyAlert", auth, patientController.sendEmergencyAlert);

    app.param("patientId", patientController.getPatientByIdDetail);
    app.param("patId", patientController.getPatientById);

    app.get("/api/getLatestMotivationalTip", auth, patientController.getLatestMotivationalTip);
}
