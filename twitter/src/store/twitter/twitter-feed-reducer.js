import {
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAIL,
    DELETE_POST,
    ADD_POST_SUCCESS,
    ADD_POST_FAIL
} from "./twitter-actions";

const initialState = {
    posts: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload.posts
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, action.payload.post]
            };
        case  FETCH_POSTS_FAIL:
        case  ADD_POST_FAIL:
            console.log(action.payload.err);
            return state;
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.post_id !== action.payload.post.post_id)
            };
        default:
            return state;
    }
};

export default reducer;