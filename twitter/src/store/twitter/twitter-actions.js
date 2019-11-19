import uuid from "uuid";
import axios from "axios";
import querystring from "querystring";

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = () => {
    const response =  JSON.parse(localStorage.getItem('posts'));
    const posts = response ? response : [];
    // console.log(posts);
    return {
        type: FETCH_POSTS,
        payload : {posts}
    }
};

export const ADD_POST = 'ADD_POST';
export const addPost = (content, username) => {
    return {
        type: ADD_POST,
        payload: {
            post: {
                id: uuid.v4(),
                content: content,
                user: username,
                created_at: Date.now()
            }
        }
    }
};

export const DELETE_POST = 'DELETE_POST';
export const deletePost = (post) => {
    return {
        type: DELETE_POST,
        payload : {post}
    }
};

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const userLogin = (credentials) => {
    return (dispatch) => {
        //
        dispatch ({
            type: USER_LOGIN_REQUEST,
            payload : {credentials}
        });

        // const querystring = require('querystring');
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        setTimeout(()=>{
            axios.post('http://dev.com/api/login/',
                querystring.stringify(credentials),config
            )
                .then(response => {
                    console.log(response);
                    if (response.data.result.err) {
                        throw new Error(response.data.result.err);
                    }
                    dispatch ({
                        type: USER_LOGIN_SUCCESS,
                        payload : {username: credentials.username}
                    });
                })
                .catch(err => {
                    console.log(err);
                    dispatch ({
                        type: USER_LOGIN_FAIL,
                        payload : {err}
                    });
                })
        }, 1000);
    };
};

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
};


export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';
export const userRegistration = (userData) => {
    return (dispatch) => {

        dispatch ({
            type: USER_REGISTER_REQUEST
        });

        // const querystring = require('querystring');
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        setTimeout(()=>{
            axios.post('http://dev.com/api/register/',
                querystring.stringify(userData),config
            )
                .then(response => {
                    console.log(response);
                    if (response.data.result.err) {
                        throw new Error(response.data.result.err);
                    }
                    dispatch ({
                        type: USER_REGISTER_SUCCESS,
                        payload : {username: userData.username}
                    });
                })
                .catch(err => {
                    console.log(err);
                    dispatch ({
                        type: USER_REGISTER_FAIL,
                        payload : {err}
                    });
                })
        }, 1000);
    };
};
