import {success} from "redux-saga-requests";
import {ADD_POST, DELETE_POST} from "./twitter-actions";

const twitterMiddleWare = (store) => (next) => (action) => {
    switch (action.type) {
        case success(ADD_POST):
        case success(DELETE_POST):
            // next(fetchPosts());
            break;
        default:
            break;
    }
    return next(action)
};

export default twitterMiddleWare