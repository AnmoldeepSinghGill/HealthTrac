const patientController = require('../controllers/patient.server.controller');
const auth = require('../middleware/auth');

module.exports = (app) => {

    app.get('/api/patient', auth, patientController.getPatient);
    app.post('/api/patient', auth, patientController.createVitalSigns);

}