import { useReducer } from 'react';
import PatientContext from './patientContext';
import PatientReducer from './patientReducer';
import axios from 'axios';
import {
    ADD_VITALSIGN,
    GET_VITALSIGNS,
    VITALSIGN_ERROR,
    CLEAR_ERRORS
} from '../types';

const PatientState = props => {

    const initialState = {
        vitalSigns: [],
        error: null,
        loading: false,
        vitalSignAdded: false
    };

    const [ state, dispatch ] = useReducer(PatientReducer, initialState);

    // Get vitalSigns
    const getVitalSigns = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/patient');

            dispatch({
                type: GET_VITALSIGNS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type:  VITALSIGN_ERROR,
                payload: err.response.data.msg
            });
        }};

    // Add vitalsign
    const addVitalSign = async (vitalSign) => {
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:3000/api/patient', vitalSign, config);
            console.log('--------- ressssss ', res.data);
            dispatch({ type: ADD_VITALSIGN, payload: res.data });

        } catch (err) {
            console.log('Error received is +++++++ ', err.response.data);
            dispatch({
                type: VITALSIGN_ERROR,
                payload: err.response.data.msg
            });
        }
    }

    // Clear Errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    }

    return (
        <PatientContext.Provider 
            value={{
                vitalSigns: state.vitalSigns,
                loading: state.loading,
                error1: state.error,
                vitalSignAdded: state.vitalSignAdded,
                addVitalSign,
                clearErrors,
                getVitalSigns
            }}
        >
            {props.children}
        </PatientContext.Provider>
    );
}

export default PatientState;