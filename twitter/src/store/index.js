import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import twitterFeedReducer from "./twitter/twitter-feed-reducer";
import twitterAuthReducer from "./twitter/twitter-auth-reducer";

import axios from "axios";
import createSagaMiddleware from "redux-saga"
import rootSaga, {USER_LOGIN_SUCCESS, USER_REGISTER_SUCCESS} from "./twitter/sagas";
import {USER_LOGIN_REQUEST} from "./twitter/twitter-actions";

const setAuthToken = (store) => (next) => (action) => {
    if (action.type === USER_LOGIN_REQUEST ) {
        axios.defaults.baseURL = '/api/';
    }
    if (action.type === USER_LOGIN_SUCCESS || action.type === USER_REGISTER_SUCCESS ) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return next(action)
};
const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({
            feed : twitterFeedReducer,
            auth: twitterAuthReducer
        }),
    composeEnhancers(applyMiddleware(
        setAuthToken,
        sagaMiddleware
    ))
);
sagaMiddleware.run(rootSaga);

export default store;