import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import axios from "axios";

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

    const apiUrl = 'http://localhost:3000/api/nurses';

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
        accountType: 'PATIENT',
    });
    const [nurseId, setNurseId] = useState('');
    // destructure from the user object
    const {firstName, lastName, email, password, password2, address, city, phoneNumber, accountType } = user;

    const [ nursesList, setNursesList ] = useState([]);
    const [ radioSelection, setRadioSelection ] = useState('PATIENT');

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }

        getAllNurses();

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated]);
    // Fills out all the properties of user state when changed
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (e.target.name === 'accountType') {
            setRadioSelection(e.target.value)
        }
    }

    const onChangeNurseId = (e) => {
        setNurseId(e.target.value);
    }

    const getAllNurses = async () => {
       await axios.get('http://localhost:3000/api/nurses').then((result) => {
           setNursesList(result.data);
           setNurseId(result.data[0].id);
       }).catch((error) => {
           console.log("error in fetching nurses:", error);
       });
    };

    // Submit function
    const onSubmit = (e) => {
        e.preventDefault();
        if ( password !== password2 ) {
            setAlert('Passwords do not match', 'danger');
        } else {
            console.log('Register Submit');
            if (user.accountType === 'PATIENT') {
                if (nurseId !== '') {
                    register({
                        firstName, lastName , email, password, address, city, phoneNumber, accountType, nurseId
                    });
                } else {
                    setAlert('Please select nurse for the patient.', 'danger');
                }
            } else {
                register({
                    firstName, lastName , email, password, address, city, phoneNumber, accountType, nurseId
                });
            }
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
                {radioSelection === 'PATIENT' &&
                <div className="form-group">
                    <label htmlFor="nurseId">Nurse</label>
                    <select name="nurseId" onChange={onChangeNurseId} value={nurseId} required>
                        {nursesList.map((nurse, idx) => (
                            <option key={idx} value={nurse._id}>{nurse.firstName} {nurse.lastName}</option>
                        ))}
                    </select >
                </div>
                }
                <input type="submit" value="Register" className='btn btn-primary btn-block' />
            </form>
        </div>
    );
};

export default Register;
