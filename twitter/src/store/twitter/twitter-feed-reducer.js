import {requestsReducer} from "redux-saga-requests";
import {ADD_POST, DELETE_POST, FETCH_POSTS, UPDATE_POST} from "./twitter-actions";

const twitterFeedReducer = requestsReducer({
    actionType: FETCH_POSTS,
    multiple: true,
    getDefaultData: () => ({data: [], current_page:1, per_page: 5, total: 0}),
    mutations: {
        [UPDATE_POST]: {
            updateData: (state, action) => {
                return {
                    ...state.data, data: state.data.data.map((post) => {
                        if (post.id === action.meta.post.id) {
                            post = action.payload.response.data;
                        }
                        return post;
                    })
                }
            },
        },
        [DELETE_POST]: {
            updateData: (state, action) => state.data,
        },
        [ADD_POST]: {
            updateData: (state, action) => state.data,
        },
    }
});

export default twitterFeedReducer;
