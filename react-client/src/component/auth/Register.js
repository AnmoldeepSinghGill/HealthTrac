import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = () => {
    // Redirect to appropriate component using history
    const history = useHistory();
    // used for accessing login information from this component
    const authContext = useContext(AuthContext);
    // used for accessing error information from this component
    const alertContext = useContext(AlertContext);
    // destructure states from authContext
    const { register, error, clearErrors, isAuthenticated } = authContext;
    // destructure state from alertContext
    const { setAlert } = alertContext;

    // states to get the user lregistration information in the form
    const [ user, setUser ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        address: '',
        city: '',
        phoneNumber: '',
        accountType: 'PATIENT'
    });
    // destructure from the user object
    const {firstName, lastName, email, password, password2, address, city, phoneNumber, accountType } = user;

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated]);
    // Fills out all the properties of user state when changed
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    // Submit function
    const onSubmit = (e) => {
        e.preventDefault();
        if ( password !== password2 ) {
            setAlert('Passwords do not match', 'danger');
        } else {
            console.log('Register Submit');
            register({
                firstName, lastName , email, password, address, city, phoneNumber, accountType
            });
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit} >
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="accountNumber">Account Number</label>*/}
                {/*    <input type="text" name='accountNumber' value={accountNumber} onChange={onChange} required/>*/}
                {/*</div>*/}
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name='firstName' value={firstName} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name='lastName' value={lastName} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} onChange={onChange} minLength='6' required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name='password2' value={password2} onChange={onChange} minLength='6' required/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name='address' value={address} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" name='city' value={city} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="text" name='phoneNumber' value={phoneNumber} onChange={onChange} required/>
                </div>
                <div>Account Type</div>
                <input type="radio" name='accountType' value='PATIENT' checked={accountType === 'PATIENT'} onChange={onChange}/> Patient{' '}
                <input type="radio" name='accountType' value='NURSE' checked={accountType === 'NURSE'} onChange={onChange}/> Nurse{' '}
                <input type="submit" value="register" className='btn btn-primary btn-block' />
            </form>
        </div>
    );
};

export default Register;
