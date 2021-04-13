import { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
// These are the types that defines the action types in useReducer
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    // Declare the states here
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {

        // @todo - load the token into global headers
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('http://localhost:5000/api/auth');
            
            dispatch({ 
                type: USER_LOADED,
                payload: res.data 
            });

        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    }
    // Register User
    const register = async formData => {
        // making post request and sending data, so we need content type to be application/json in header
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:5000/api/users', formData, config);
            console.log(res.data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            console.log(err.response);
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    }

    // Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5000/api/signin', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
    }
    // Logout
    const logout = () => {
        dispatch({ 
            type: LOGOUT
        });
    }
    // Clear Errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS});
    }

    return (
        <AuthContext.Provider 
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                clearErrors,
                loadUser,
                login,
                logout
            }} >
                {props.children}
            </AuthContext.Provider>
    );
};

export default AuthState;