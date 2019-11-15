import {createStore, combineReducers, applyMiddleware} from "redux";
import twitterFeedReducer from "./twitter/twitter-feed-reducer";
// import twitterCreateFeedReducer from "./twitter/twitter-create-feed-reducer";

// const reducer = combineReducers({
//     twitterFeedReducer,
//     twitterCreateFeedReducer
// });

import {FETCH_POSTS, ADD_POST, DELETE_POST} from "./twitter/twitter-actions";
const logMiddleware = (store) => (next) => (action) => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result
};

const dbMiddleware = (store) => (next) => (action) => {
    // console.log('dbMiddleware prev state', store.getState());
    let result = next(action);
    // console.log('dbMiddleware next state', store.getState());
    switch (action.type) {
        case ADD_POST:
        case DELETE_POST:
            localStorage.setItem('posts', JSON.stringify( store.getState().posts));
            break;
        default:
            return false;
    }

    return result;
};

const store = createStore(
    twitterFeedReducer,
    applyMiddleware(
        // logMiddleware,
        dbMiddleware,
        logMiddleware
    )
);

export default store;