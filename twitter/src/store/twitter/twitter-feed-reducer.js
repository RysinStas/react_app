import {ADD_POST, DELETE_POST, FETCH_POSTS, UPDATE_POST} from "./twitter-actions";
import {success, error} from "redux-saga-requests";

const initialState = {
    posts: [],
    current_page: 1,
    per_page: 5,
    total: 0,
    pending: false,
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
        case error(FETCH_POSTS):
        case error(ADD_POST):
        case error(DELETE_POST):
        case error(UPDATE_POST):
            return {
                ...state,
                pending: false
            };
        default:
            return state;
    }
};

export default twitterFeedReducer;
