import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import twitterFeedReducer from "./twitter/twitter-feed-reducer";
import twitterAuthReducer from "./twitter/twitter-auth-reducer";
// import thunkMiddleware from "redux-thunk";
import axios from "axios";
import createSagaMiddleware from "redux-saga"
import rootSaga from "./sagas/sagas";

// const logMiddleware = (store) => (next) => (action) => {
//     console.group(action.type);
//     console.info('dispatching', action);
//     let result = next(action);
//     console.log('next state', store.getState());
//     console.groupEnd();
//     return result
// };

const setAuthToken = (store) => (next) => (action) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
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
        // thunkMiddleware,
        // logMiddleware
    ))
);
sagaMiddleware.run(rootSaga);

export default store;