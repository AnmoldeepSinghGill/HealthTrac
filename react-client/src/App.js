import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Fragment } from 'react';
import AuthState from './context/auth/AuthState';
import Home from './component/pages/Home';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Navbar from './component/layout/Navbar';
import setAuthToken from '../src/utils/setAuthToken';
import PrivateRoute from './component/routing/privateRoute';
import Alert from './component/layout/Alert';
import './App.css';
import AlertState from './context/alert/AlertState';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertState>
    </AuthState>
  );
}

export default App;
