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
import Nav from 'react-bootstrap/Nav';
import './App.css';
//
import List from './components/List';
import EditStudent from './components/EditStudent';
import EditArticle from './components/EditArticle';

import CreateAccount from './components/CreateAccount';
import ShowUser from './components/ShowStudent';
import ShowArticle from './components/ShowArticle';

import Home from './component/pages/Home';
import Login from './component/auth/Login';
import ListCourses from './components/ListCourses';
import PatientDetails from "./component/pages/patientDetails";
import AddPatientClinicalData from "./component/pages/addPatientClinicalData";
//

if (sessionStorage.token) {
  setAuthToken(sessionStorage.token);
}

function App() {

  return (
    //<Router>
      //<Navbar bg="light" expand="lg">
       // <Navbar.Toggle aria-controls="basic-navbar-nav" />
       // <Navbar.Collapse id="basic-navbar-nav">
         // <Nav className="mr-auto">
          //  <Nav.Link className="navi" href="/home">Home</Nav.Link>
          //  <Nav.Link className="navi" href="/login">Login</Nav.Link>
          //  <Nav.Link className="navi"href="/list">List of Users</Nav.Link>
          //  <Nav.Link className="navi"href="/listCourses">List of Courses</Nav.Link>
          //  <Nav.Link className="navi"href="/create">Sign Up</Nav.Link>
       //   </Nav>
       // </Navbar.Collapse>
     // </Navbar>
     // <div>          
         // <Route render ={()=> < Home />} path="/home" /> 
         // <Route render ={()=> < Login />} path="/login" />
         // <Route render ={()=> < List />} path="/list" />
         // <Route render ={()=> < ListCourses />} path="/listCourses" />
         // <Route render ={()=> < EditStudent />} path="/edit/:id" />
       //  <Route render ={()=> < CreateAccount/>} path="/create" />
       //  <Route render ={()=> < ShowUser />} path="/show/:id" />
      //    <Route render ={()=> < ShowArticle />} path="/showCourse/:id" />
      //    <Route render ={()=> < EditArticle />} path="/editarticle/:id" />
     // </div>
    // </Router>
    <AuthState>
      <AlertState>
        <PatientState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alert />
                <Switch>
                  {/* Use PrivateRoute for private access components */}
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/showDetails' component={PatientDetails} />
                  <PrivateRoute exact path='/addPatientClinicalData' component={AddPatientClinicalData} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/patient/vitalsign' component={PatientVitalSign} />
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
