import {FETCH_POSTS, ADD_POST, DELETE_POST} from "./actions";

const initialState = {
    posts: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            };
        case ADD_POST:
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