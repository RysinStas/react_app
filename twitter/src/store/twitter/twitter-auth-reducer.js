import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from "./twitter-actions";

const initialState = {
    loading: false,
    username: false,
    err: false
};

const twitterAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            return {
                ...state,
                username: false
            };
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                err: false,
                username: action.payload.username
            };
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                err: action.payload.err
            };
        default:
            return state;
    }
};

export default twitterAuthReducer;