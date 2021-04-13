// This file performs the actions and passes the data to alertReducer to change the state

import { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { v4 as UUIDv4} from 'uuid';
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = [];

    const [ state, dispatch ] = useReducer(alertReducer, initialState);

    // Set Alert
    const setAlert = (msg, type) => {
        const id = UUIDv4();
        dispatch({ type: SET_ALERT, payload: {msg, type, id}});

        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT, payload: id})
        }, 5000);
    }

    return <AlertContext.Provider
        value={{
            alerts: state,
            setAlert
        }} >
            {props.children}
        </AlertContext.Provider>

}

export default AlertState;