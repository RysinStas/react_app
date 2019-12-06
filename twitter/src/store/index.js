import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import twitterFeedReducer from "./twitter/twitter-feed-reducer";
import authReducer from "./auth/auth-reducer";
import axios from "axios";
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas";
import { DELETE_AUTH_HEADER, SET_AUTH_HEADER } from "./auth/auth-actions";
import {requestsPromiseMiddleware} from "redux-saga-requests";

import authMiddleWare from "./auth/auth-middleware";
import twitterMiddleWare from "./twitter/twitter-middleware";

const setAxiosDefaults = (store) => (next) => (action) => {
    switch (action.type) {
        case SET_AUTH_HEADER:
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.access_token}`;
            break;
        case DELETE_AUTH_HEADER:
            delete axios.defaults.headers.common['Authorization'];
            break;
        default:
            axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
            break;
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
            auth: authReducer
        }),
    composeEnhancers(applyMiddleware(
        thunkMiddleware,
        authMiddleWare,
        twitterMiddleWare,
        setAxiosDefaults,
        requestsPromiseMiddleware(),
        sagaMiddleware,
    ))
);

sagaMiddleware.run(
    rootSaga
);

export default store;