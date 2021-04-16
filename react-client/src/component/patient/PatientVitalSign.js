import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import PatientContext from '../../context/patient/patientContext';
import axios from "axios";

const PatientVitalSign = () => {
    // Redirect to appropriate component using history
    const history = useHistory();
    // used for accessing login information from this component
    // const authContext = useContext(AuthContext);
    // used for accessing error information from this component
    const alertContext = useContext(AlertContext);

    const patientContext = useContext(PatientContext);
    // destructure states from authContext
    // const { register, error, clearErrors, isAuthenticated } = authContext;
    // destructure state from alertContext
    const { setAlert } = alertContext;

    const { addVitalSign, error1, clearErrors, vitalSignAdded } = patientContext;

    const apiUrl = 'http://localhost:3000/api/patient';

    // states to get the user lregistration information in the form
    const [ vitalSign, setVitalSign ] = useState({
        pulseRate: '',
        bloodPressure: '' , 
        weight: '', 
        temperature: '', 
        respiratoryRate: '', 
        createdBy: 'PATIENT'
    });
    // destructure from the user object
    const { pulseRate, bloodPressure, weight, temperature, respiratoryRate, createdBy } = vitalSign;

    useEffect(() => {
        if(vitalSignAdded) {
            history.push('/');
        }
        if (error1 === 'Server Error') {
            setAlert(error1, 'danger');
            clearErrors();
        }
        clearErrors();
        // eslint-disable-next-line
    }, [error1, vitalSignAdded]);
    // Fills out all the properties of user state when changed
    const onChange = (e) => {
        setVitalSign({ ...vitalSign, [e.target.name]: e.target.value });
    }

    // Submit function
    const onSubmit = (e) => {
        e.preventDefault();
        
        addVitalSign({
            pulseRate, bloodPressure, weight, temperature, respiratoryRate, createdBy
        });
    }

    return (
        <div className='form-container card-container'>
            <h1>
                Enter <span className="text-primary">Vital Signs</span>
            </h1>
            <div className="row justify-content-center">
            <form onSubmit={onSubmit} style={{width: "50%"}}>
                <div className="form-group">
                    <label htmlFor="pulseRate">Pulse Rate</label>
                    <input className='form-control' type="number" name='pulseRate' value={pulseRate} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="bloodPressure">Blood Pressure</label>
                    <input className='form-control' type="text" name='bloodPressure' value={bloodPressure} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight</label>
                    <input className='form-control' type="number" name='weight' value={weight} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="respiratoryRate">Respiratory Rate</label>
                    <input className='form-control' type="number" name='respiratoryRate' value={respiratoryRate} onChange={onChange} minLength='6' required/>
                </div>
                <div className="form-group">
                    <label htmlFor="temperature">Temperature</label>
                    <input className='form-control' type="number" name='temperature' value={temperature} onChange={onChange} minLength='6' required/>
                </div>
                
                <input type="submit" value="Add Vital Sign" className='btn btn-primary btn-block' />
            </form>
            </div>
        </div>
    );
};

export default PatientVitalSign;
