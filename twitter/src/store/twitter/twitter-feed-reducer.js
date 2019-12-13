import {ADD_POST, DELETE_POST, FETCH_POSTS, FETCH_POSTS_MENTIONS, UPDATE_POST} from "./twitter-actions";
import {success} from "redux-saga-requests";
import {REMOVE_AUTH_ERRORS, SHOW_AUTH_ERROR} from "../auth/auth-actions";

const initialState = {
    posts: [],
    current_page: 1,
    per_page: 5,
    total: 0,
    pending: false,
    error: [],
};

const twitterFeedReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
        case ADD_POST:
        case DELETE_POST:
        case UPDATE_POST:
            return {
                ...state,
                pending: true
            };
        case success(FETCH_POSTS):
        case success(FETCH_POSTS_MENTIONS):
            const { data: posts, current_page, per_page, total} = action.payload.data;
            return {
                ...state,
                current_page, per_page, total,
                posts,
                error: [],
                pending: false
            };
        case success(ADD_POST):
        case success(DELETE_POST):
            return {
                ...state,
                error: [],
                pending: false
            };
        case success(UPDATE_POST):
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id === action.meta.post.id) {
                        post = action.payload.response.data;
                    }
                    return post;
                })
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
        default:
            return state;
    }
};

export default twitterFeedReducer;
