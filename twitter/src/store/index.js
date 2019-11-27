import {createStore, combineReducers, applyMiddleware} from "redux";
import twitterFeedReducer from "./twitter/twitter-feed-reducer";
import twitterAuthReducer from "./twitter/twitter-auth-reducer";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

const logMiddleware = (store) => (next) => (action) => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result
};

const setAuthToken = (store) => (next) => (action) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    return next(action)
};

const store = createStore(
    combineReducers({
            feed : twitterFeedReducer,
            auth: twitterAuthReducer
        }),
    applyMiddleware(
        setAuthToken,
        thunkMiddleware,
        logMiddleware
    )
);

export default store;