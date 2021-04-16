import {
    ADD_VITALSIGN,
    CLEAR_ERRORS,
    GET_VITALSIGNS,
    VITALSIGN_ERROR
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_VITALSIGNS:
            return {
                ...state,
                vitalSigns: action.payload,
                loading: false
            }
        case ADD_VITALSIGN:
            return {
                ...state,
                vitalSigns: [...state.vitalSigns, action.payload ],
                loading: false,
                vitalSignAdded: true
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                vitalSignAdded: false
            }
        default:
            return state;
    }
}