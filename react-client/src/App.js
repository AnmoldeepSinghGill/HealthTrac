import Alert from './component/layout/Alert';
// AlertState is used for passing setAlert througout the react application which shows errors
// AuthState is used for passing login information and maintaining login persons information in whole react application


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Fragment } from 'react';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Register from './component/auth/Register';
import Navbar from './component/layout/Navbar';
import setAuthToken from '../src/utils/setAuthToken';
import PrivateRoute from './component/routing/privateRoute';
import PatientVitalSign from './component/patient/PatientVitalSign';
import PatientState from './context/patient/PatientState';
import './App.css';
//

/**
 * Name: Anmoldeep Singh Gill, Mohammad bakir, Alvin Yap, Kharak Kular
 * Student Number: 301044883, 300987420, 301041207, 301042015
 */

import Home from './component/pages/Home';
import Login from './component/auth/Login';
import SymptomCheck from './component/pages/symptomCheck';
import PatientDetails from "./component/pages/patientDetails";
import AddPatientClinicalData from "./component/pages/addPatientClinicalData";
import AddPatientMotivationalTip from "./component/pages/addPatientMotivationalTip";
import AddPatientVitalSign from "./component/pages/addPatientVitalSign";
import AddExistingPatientMotivationalTip from "./component/pages/existingMotivationalTips";
import RiskRateResults from "./component/pages/riskRateResult";
import SendEmergencyAlert from "./component/pages/sendEmergencyAlert";
//

if (sessionStorage.token) {
  setAuthToken(sessionStorage.token);
}

function App() {

  return (
    <AuthState>
      <AlertState>
        <PatientState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container" style={{maxWidth: "1300px"}}>
                <Alert />
                <Switch>
                  {/* Use PrivateRoute for private access components */}
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/showDetails' component={PatientDetails} />
                  <PrivateRoute exact path='/addPatientClinicalData' component={AddPatientClinicalData} />
                  <PrivateRoute exact path='/addPatientMotivationalTip' component={AddPatientMotivationalTip} />
                  <PrivateRoute exact path='/addExistingPatientMotivationalTip' component={AddExistingPatientMotivationalTip} />
                  <PrivateRoute exact path='/addPatientVitalSigns' component={AddPatientVitalSign} />
                  <PrivateRoute exact path='/riskRateResult' component={RiskRateResults} />
                  <PrivateRoute exact path='/patient/sendEmergencyAlert' component={SendEmergencyAlert} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <PrivateRoute exact path='/patient/vitalsign' component={PatientVitalSign} />
                  <PrivateRoute exact path ='/patient/symptoms' component={SymptomCheck}/>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </PatientState>
      </AlertState>
    </AuthState>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
