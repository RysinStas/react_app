import {
    APP_INIT, FETCH_USER,
    USER_LOGIN, USER_LOGOUT, USER_REGISTER
} from "./auth-actions";
import {success, error} from "redux-saga-requests";

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
                pending: true
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
        case error(USER_LOGIN):
        case error(USER_REGISTER):
        case error(USER_LOGOUT):
            return {
                ...state,
                pending: false,
                error: action.payload.error
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