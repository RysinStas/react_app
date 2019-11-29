import axios from "axios";

axios.defaults.baseURL = '/api/';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const fetchPosts = (page = 1) => {
    return ({
        type: FETCH_POSTS_REQUEST,
        payload: {page}
    })
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const addPost = (content, username) => {
    return ({
        type: ADD_POST_REQUEST,
        payload: {content, username}
    })
};

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const deletePost = (post) => {
    return ({
        type: DELETE_POST_REQUEST,
        payload: {post}
    })
};

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const updatePost = (post, newContent) => {
    return ({
        type: UPDATE_POST_REQUEST,
        payload: {post, newContent}
    })
};

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const userLogin = (credentials) => {
    return ({
        type: USER_LOGIN_REQUEST,
        payload: {credentials}
    })
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
export const userRegistration = (userData) => {
    return ({
        type: USER_REGISTER_REQUEST,
        payload: {userData}
    })
};
