import {showErrors} from "../errors/errors-actions";

export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = (params={page:1}) => {
    const queryString = Object.entries(params).map(([key, val]) => `${key}=${val}`).join('&');
    return ({
        type: FETCH_POSTS,
        payload: {
            request: {
                url: `posts?${queryString}`
            },
        }
    })
};

export const ADD_POST = 'ADD_POST';
export const addPost = (content, username) => {
    return ({
        type: ADD_POST,
        payload: {
            request: {
                url: `posts/`,
                method: 'post',
                data: {content}
            },
        },
        meta: {
            asPromise: true,
            content,
            username
        }
    })
};

export const DELETE_POST = 'DELETE_POST';
export const deletePost = (post) => {
    return ({
        type: DELETE_POST,
        payload: {
            request: {
                url: `posts/${post.id}`,
                method: 'delete'
            },
        },
        meta: {
            post,
            asPromise: true,
        },
    })
};

export const UPDATE_POST = 'UPDATE_POST';
export const updatePost = (post, newContent) => {
    return ({
        type: UPDATE_POST,
        payload: {
            request: {
                url: `posts/${post.id}`,
                method: 'put',
                data: {content: newContent}
            },
        },
        meta: {post, newContent}
    })
};

export const FETCH_HASHTAGS = 'FETCH_HASHTAGS';
export const fetchHashtags = (name = '') => {
    return ({
        type: FETCH_HASHTAGS,
        payload: {
            request: {
                url: `hashtag/${name}`,
            },
        },
        meta: {asPromise: true}
    })
};

export const FETCH_MENTIONS = 'FETCH_MENTIONS';
export const fetchMentions = (name = '') => {
    return ({
        type: FETCH_MENTIONS,
        payload: {
            request: {
                url: `mentions/${name}`,
            },
        },
        meta: {asPromise: true}
    })
};

export const addPostAndFetchPosts = (content, username) => async (dispatch) => {
    try {
        await dispatch(addPost(content, username));
        await dispatch(fetchPosts());
    } catch (error) {
        dispatch(showErrors(error.payload.response));
    }
};

export const deletePostAndFetchPosts = (post) => async (dispatch) => {
    try {
        await dispatch(deletePost(post));
        await dispatch(fetchPosts());
    } catch (error) {
        dispatch(showErrors(error.payload.response));
    }
};

