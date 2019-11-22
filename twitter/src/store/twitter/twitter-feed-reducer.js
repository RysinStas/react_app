import {
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAIL,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
    ADD_POST_SUCCESS,
    ADD_POST_FAIL,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAIL
} from "./twitter-actions";

const initialState = {
    current_page: 1,
    data: [],
    per_page: 5,
    total: 0,
    error: [],
    loading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                ...action.payload.data,
                error: [],
                loading: false
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                error: [],
                loading: false
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                error: [],
                loading: false
            };
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                data: state.data.map((post) => {
                    if (post.id === action.payload.post.id) {
                        post = action.payload.post;
                    }
                    return post;
                })
            };
        case FETCH_POSTS_FAIL:
        case ADD_POST_FAIL:
        case DELETE_POST_FAIL:
        case UPDATE_POST_FAIL:
            return {
                ...state,
                error: [...state.error , action.payload.error],
                loading: false};
        default:
            return state;
    }
};

export default reducer;