import axios from "axios";
import querystring from "querystring";

const API_URL = '/api/';

// const getData = (page = 1) => {
//     axios.get(`${API_URL}posts?page=${page}`,
//         {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//     ).then(response => {
//         if (response.data.err) {
//             throw new Error(response.data.err);
//         }
//         return response.data
//     }).catch(err => {
//         return err
//     });
// };

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';
export const fetchPosts = (page = 1) => {
    return (dispatch) => {
        axios.get(`${API_URL}posts?page=${page}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload : {data: response.data}
            });
        }).catch(error => {
            console.log(error);
            dispatch({
                type: FETCH_POSTS_FAIL,
                payload: {error}
            });
        });
    }
};

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';
export const addPost = (content, username) => {
    return (dispatch) => {
        axios.post(`${API_URL}posts/`,
            {
                content: content
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            const post = {
                id: response.data.id,
                content: response.data.content,
                username: username,
                created_at: response.data.created_at
            };
            dispatch({
                type: ADD_POST_SUCCESS,
                payload: {post}
            });
        }).catch(error => {
            dispatch({
                type: ADD_POST_FAIL,
                payload: {error}
            });
        })
    }
};

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAIL = 'DELETE_POST_FAIL';
export const deletePost = (post) => {
    return (dispatch) => {
        axios.delete(`${API_URL}posts/${post.id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            dispatch({
                type: DELETE_POST_SUCCESS,
                payload : {post}
            });
        }).catch(error => {
            dispatch({
                type: DELETE_POST_FAIL,
                payload: {error}
            });
        })
    };
};

export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAIL = 'UPDATE_POST_FAIL';
export const updatePost = (post, newContent) => {
    return (dispatch) => {
        axios.put(`${API_URL}posts/${post.id}`,
            {
                content : newContent
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            dispatch({
                type: UPDATE_POST_SUCCESS,
                payload : {post: response.data}
            });
        }).catch(error => {
            dispatch({
                type: UPDATE_POST_FAIL,
                payload: {error}
            });
        })
    };
};

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
                    if (response.data.error) {
                        throw new Error(response.data.error);
                    }
                    dispatch ({
                        type: USER_LOGIN_SUCCESS,
                        payload : {username: credentials.username}
                    });
                }).catch(error => {
                    console.log(error);
                    dispatch ({
                        type: USER_LOGIN_FAIL,
                        payload : {error}
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
                    if (response.data.error) {
                        throw new Error(response.data.error);
                    }
                    dispatch ({
                        type: USER_REGISTER_SUCCESS,
                        payload : {username: userData.username}
                    });
                })
                .catch(error => {
                    console.log(error);
                    dispatch ({
                        type: USER_REGISTER_FAIL,
                        payload : {error}
                    });
                })
        }, 1000);
    };
};
