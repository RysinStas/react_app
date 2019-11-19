import {
    FETCH_POSTS,
    ADD_POST,
    DELETE_POST,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from "./twitter-actions";

const initialState = {
    posts: [],
    loading: false,
    username: false,
    err: false
};

const reducer = (state = initialState, action) => {
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
        case FETCH_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            };
        case ADD_POST:
            // console.log('запись в store');
            return {
                ...state,
                posts: [...state.posts, action.payload.post]
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload.post.id)
            };
        default:
            return state;
    }
};

export default reducer;