import {FETCH_POSTS, ADD_POST, DELETE_POST} from "./twitter-actions";

const initialState = {
    posts: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload.post]
            };

        default:
            return state;
    }
};

export default reducer;