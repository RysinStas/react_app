import uuid from "uuid";
import axios from "axios";
import querystring from "querystring";

export const API_URL = 'http://dev.com/api/';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';
export const fetchPosts = () => {
    return (dispatch) => {
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        axios.get(`${API_URL}posts/`, config
        ).then(response => {
            if (response.data.err) {
                throw new Error(response.data.err);
            }
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload : {posts: response.data.data}
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: FETCH_POSTS_FAIL,
                payload: {err}
            });
        });
    }
};

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';
export const addPost = (content, username) => {
    return (dispatch) => {
        const post = {
            post_id: uuid.v4(),
            content: content,
            username: username,
            created_at: Date.now()
        };
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        axios.post(`${API_URL}posts/`,
            querystring.stringify(post), config
        ).then(response => {
            if (response.data.err) {
                throw new Error(response.data.err);
            }
            dispatch({
                type: ADD_POST_SUCCESS,
                payload: {post}
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: ADD_POST_FAIL,
                payload: {err}
            });
        })
    }
};

export const DELETE_POST = 'DELETE_POST';
export const deletePost = (post) => {
    return (dispatch) => {
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        const data = {delete: post.post_id};
        axios.post(`${API_URL}posts/`,
            querystring.stringify(data), config
        ).then(response => {
            if (response.data.err) {
                throw new Error(response.data.err);
            }
            dispatch({
                type: DELETE_POST,
                payload : {post}
            });
        })
            .catch(err => {
                console.log(err);
                // dispatch({
                //     type: ADD_POST_FAIL,
                //     payload: {err}
                // });
            })
    };
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
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        setTimeout(()=>{
            axios.post(`${API_URL}login/`,
                querystring.stringify(credentials),config
            )
                .then(response => {
                    if (response.data.err) {
                        throw new Error(response.data.err);
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

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        setTimeout(()=>{
            axios.post(`${API_URL}register/`,
                querystring.stringify(userData),config
            )
                .then(response => {
                    if (response.data.err) {
                        throw new Error(response.data.err);
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
