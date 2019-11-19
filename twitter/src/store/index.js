import {createStore, combineReducers, applyMiddleware} from "redux";
import twitterFeedReducer from "./twitter/twitter-feed-reducer";
// import twitterCreateFeedReducer from "./twitter/twitter-create-feed-reducer";

// const reducer = combineReducers({
//     twitterFeedReducer,
//     twitterCreateFeedReducer
// });
import thunkMiddleware from "redux-thunk";

import {FETCH_POSTS, ADD_POST, DELETE_POST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL} from "./twitter/twitter-actions";
import axios from "axios";
import querystring from "querystring";

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

            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            };
            setTimeout(()=>{
                axios.post('http://dev.com/api/posts/',
                    querystring.stringify(store.getState().posts),config
                )
                    .then(response => {
                        console.log(response);
                        if (response.data.result.err) {
                            throw new Error(response.data.result.err);
                        }
                        // dispatch ({
                        //     type: USER_LOGIN_SUCCESS,
                        //     payload : {username: credentials.username}
                        // });
                    })
                    .catch(err => {
                        console.log(err);
                        // dispatch ({
                        //     type: USER_LOGIN_FAIL,
                        //     payload : {err}
                        // });
                    })
            }, 1000);

            break;
        default:
            return false;
    }

    return result;
};

const store = createStore(
    twitterFeedReducer,
    applyMiddleware(
        thunkMiddleware,
        // logMiddleware,
        dbMiddleware,
        logMiddleware
    )
);

// const delayedActionCreator = (time) => (dispatch) => {
//     setTimeout(()=> dispatch({
//         type: 'DELETE_ACTION'
//     }),time);
// };
// store.dispatch(delayedActionCreator(4000));

export default store;