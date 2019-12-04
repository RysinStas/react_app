import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import twitterFeedReducer from "./twitter/twitter-feed-reducer";
import authReducer from "./auth/auth-reducer";
import axios from "axios";
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas";
import {
    APP_INIT,
    DELETE_AUTH_HEADER,
    SET_AUTH_HEADER
} from "./auth/auth-actions";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

const setAxiosDefaults = (store) => (next) => (action) => {
    switch (action.type) {
        case SET_AUTH_HEADER:
        case APP_INIT:
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${action.payload.access_token}`;
            break;
        case DELETE_AUTH_HEADER:
            delete axiosInstance.defaults.headers.common['Authorization'];
            break;
        default:
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
        setAxiosDefaults,
        sagaMiddleware
    ))
);

sagaMiddleware.run(
    rootSaga,
    axiosInstance
);

export default store;