import uuid from "uuid";
import axios from "axios";

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
export const addPost = (content) => {
    return {
        type: ADD_POST,
        payload: {
            post: {
                id: uuid.v4(),
                content: content,
                user: 'admin',
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
export const userLogin = (post) => {
    return {
        type: USER_LOGIN,
        payload : {post}
    }
};