import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import twitterFeedReducer from "./twitter/twitter-feed-reducer";
import twitterAuthReducer from "./twitter/twitter-auth-reducer";
import axios from "axios";
import createSagaMiddleware from "redux-saga"
import rootSaga, {USER_LOGIN_SUCCESS, USER_REGISTER_SUCCESS} from "./twitter/sagas";
import {USER_LOGIN_REQUEST, USER_REGISTER_REQUEST} from "./twitter/twitter-actions";

const setAxiosDefaults = (store) => (next) => (action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
            axios.defaults.baseURL = '/api/';
            break;
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
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
            auth: twitterAuthReducer
        }),
    composeEnhancers(applyMiddleware(
        setAxiosDefaults,
        sagaMiddleware
    ))
);
sagaMiddleware.run(rootSaga);

export default store;