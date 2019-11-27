import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE
} from "./twitter-actions";

const initialState = {
    pending: false,
    username: '',
    access_token: '',
    error: []
};

const twitterAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            return {
                ...state,
                username: '',
                access_token: '',
                error: []
            };
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                pending: false,
                error: [],
                username: action.payload.username,
                access_token: action.payload.access_token
            };
        case USER_LOGIN_FAILURE:
        case USER_REGISTER_FAILURE:
            return {
                ...state,
                pending: false,
                access_token: '',
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default twitterAuthReducer;