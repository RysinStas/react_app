import {
    FETCH_POSTS_REQUEST,
    ADD_POST_REQUEST,
    DELETE_POST_REQUEST,
    UPDATE_POST_REQUEST
} from "./twitter-actions";
import {
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE
} from "./sagas";

const initialState = {
    current_page: 1,
    posts: [],
    per_page: 5,
    total: 0,
    error: [],
    pending: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
        case ADD_POST_REQUEST:
        case DELETE_POST_REQUEST:
        case UPDATE_POST_REQUEST:
            return {
                ...state,
                pending: true
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                posts: action.payload.data,
                pending: false
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                error: [],
                pending: false
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                error: [],
                pending: false
            };
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: state.data.map((post) => {
                    if (post.id === action.payload.post.id) {
                        post = action.payload.post;
                    }
                    return post;
                })
            };
        case FETCH_POSTS_FAILURE:
        case ADD_POST_FAILURE:
        case DELETE_POST_FAILURE:
        case UPDATE_POST_FAILURE:
            return {
                ...state,
                error: [...state.error , action.payload.error],
                pending: false
            };
        default:
            return state;
    }
};

export default reducer;