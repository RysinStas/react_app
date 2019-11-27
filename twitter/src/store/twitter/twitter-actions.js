import axios from "axios";

axios.defaults.baseURL = '/api/';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const fetchPosts = (page = 1) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`posts?page=${page}`);
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload: {data: response.data}
            });
        } catch (error) {
            dispatch({
                type: FETCH_POSTS_FAILURE,
                payload: {error}
            });
        }
    }
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const addPost = (content, username) => {
    return async (dispatch) => {
        try {
            const response = await  axios.post(`posts/`,
                {
                    content: content
                }
            );
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
        } catch (error) {
            dispatch({
                type: ADD_POST_FAILURE,
                payload: {error}
            });
        }
    }
};

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
export const deletePost = (post) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`posts/${post.id}`);
            console.log(response);
            dispatch({
                type: DELETE_POST_SUCCESS,
                payload: {post}
            });
        } catch (error) {
            dispatch({
                type: DELETE_POST_FAILURE,
                payload: {error}
            });
        }
    };
};

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';
export const updatePost = (post, newContent) => {
    return async (dispatch) => {
        try {
            const response = await  axios.put(`posts/${post.id}`,
                {
                    content: newContent
                }
            );
            console.log(response);
            dispatch({
                type: UPDATE_POST_SUCCESS,
                payload: {post: response.data}
            });
        } catch (error) {
            dispatch({
                type: UPDATE_POST_FAILURE,
                payload: {error}
            });
        }
    };
};

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const userLogin = (credentials) => {
    return  (dispatch) => {
        dispatch ({
            type: USER_LOGIN_REQUEST
        });
        setTimeout(async () => {
            try {
                const response = await  axios.post(`login`,
                    {
                        name: credentials.login,
                        password: credentials.password
                    }
                );
                localStorage.setItem('username', credentials.login);
                localStorage.setItem('access_token', response.data.access_token);
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: {
                        username: credentials.login,
                        access_token: response.data.access_token
                    }
                });
            } catch (error) {
                dispatch({
                    type: USER_LOGIN_FAILURE,
                    payload: {error}
                });
            }
        }, 1000);
    };
};

export const USER_LOGOUT = 'USER_LOGOUT';
export const userLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    return {
        type: USER_LOGOUT
    }
};


export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
export const userRegistration = (userData) => {
    return (dispatch) => {
        dispatch({
            type: USER_REGISTER_REQUEST
        });
        setTimeout(async () => {
            try {
                const response = await axios.post(`register`,
                    {
                        email: userData.email,
                        password: userData.password,
                        name: userData.username
                    }
                );
                localStorage.setItem('username', userData.username);
                localStorage.setItem('access_token', response.data.access_token);
                dispatch({
                    type: USER_REGISTER_SUCCESS,
                    payload: {
                        username: userData.username,
                        access_token: response.data.access_token}
                });
            } catch (error) {
                dispatch({
                    type: USER_REGISTER_FAILURE,
                    payload: {error}
                });
            }
        }, 1000);
    };
};
