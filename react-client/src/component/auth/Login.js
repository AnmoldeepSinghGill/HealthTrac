import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = () => {
    // used for accessing login information from this component
    const authContext = useContext(AuthContext);
    // used for accessing error information from this component
    const alertContext = useContext(AlertContext);
    // Redirect to appropriate component using history
    const history = useHistory();
    // destructure states from authContext
    const { login, error, clearErrors, isAuthenticated } = authContext;
    // destructure state from alertContext
    const { setAlert } = alertContext;

    useEffect(() => {
        // checks if the user is loggedin or if the user has token in the local storage
        if (isAuthenticated) {
            // if yes, redirects to Home component
            history.push('/');
        }
        // While logging, if the information is not correct. The setAlert function in AlertState
        // gets error and displays in Alert component
        if (error === 'Invalid Credentials'){
            setAlert(error, 'danger');
            // after the error is displayed the clearError function clears the error state in AuthState.
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated]);
    // states to get the user login information in the form
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });
    // destructure the email and password from user object
    const { email, password } = user;
    // Fills out all the properties of user state when changed
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    // Submit function
    const onSubmit = (e) => {
        e.preventDefault();
        
        console.log('Login submit');
        login(user);
    
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required/>
                </div>
                <input type="submit" value="Login" className='btn btn-primary btn-block' />
            </form>
        </div>
    );
};

export default Login;
