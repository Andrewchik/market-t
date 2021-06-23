import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAIL,
    AUTH_LOGOUT_SUCCESS,
} from '../constants';

const initialState = {
    auth: {},
    loggedIn: false,
    loading: false,
    errorText: null
};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                auth: action.payload,
            };

        case AUTH_LOGIN_FAIL:
            return {
                ...state,
                loggedIn: false,
                loading: false,
                errorText: action.payload.error,
            };

        case AUTH_LOGOUT_SUCCESS:
            return {
                ...initialState,
            };

        default:
            return state;
    }
}
