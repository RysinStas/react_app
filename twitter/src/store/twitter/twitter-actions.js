import uuid from "uuid";

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = (posts) => {
    return {
        type: FETCH_POSTS,
        payload : {posts}
    }
};

export const ADD_POST = 'ADD_POST';
export const addPost = (content) => {
    return {
        type: 'ADD_POST',
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
        type: 'DELETE_POST',
        payload : {post}
    }
};