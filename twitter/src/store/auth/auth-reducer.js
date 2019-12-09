import {
    APP_INIT, FETCH_USER, REMOVE_AUTH_ERRORS, SHOW_AUTH_ERROR,
    USER_LOGIN, USER_LOGOUT, USER_REGISTER
} from "./auth-actions";
import {success} from "redux-saga-requests";

const initialState = {
    account: {},
    pending: false,
    error: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGOUT:
        case USER_LOGIN:
        case USER_REGISTER:
            return {
                ...state,
                pending: true,
                error: []
            };
        case success(USER_LOGIN):
        case success(USER_REGISTER):
            return {
                ...state,
                pending: false,
                error: [],
                account: action.payload.data
            };
        case success(FETCH_USER):
            return {
                ...state,
                pending: false,
                error: [],
                account: {...state.account, ...action.payload.data}
            };
        case success(USER_LOGOUT):
            return {
                ...state,
                ...initialState
            };
        case SHOW_AUTH_ERROR:
            return {
                ...state,
                pending: false,
                error: [...state.error, action.payload]
            };
        case REMOVE_AUTH_ERRORS:
            return {
                ...state,
                pending: false,
                error: []
            };
        case APP_INIT:
            return {
                ...state,
                account: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;