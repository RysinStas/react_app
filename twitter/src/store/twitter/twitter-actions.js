export const FETCH_POSTS = 'FETCH_POSTS';
export const fetchPosts = (page = 1) => {
    return ({
        type: FETCH_POSTS,
        payload: {
            request: {
                url: `posts?page=${page}`,
            },
        },
        meta: {page}
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

export const addPostAndFetchPosts = (content, username) => async (dispatch) => {
    try {
        await dispatch(addPost(content, username));
        await dispatch(fetchPosts());
    } catch (error) {
        console.log('addPostAndFetchPosts');
        dispatch(showPostError(error));
    }
};

export const deletePostAndFetchPosts = (post) => async (dispatch) => {
    try {
        await dispatch(deletePost(post));
        await dispatch(fetchPosts());
    } catch (error) {
        console.log('deletePostAndFetchPosts');
        dispatch(showPostError(error));
    }
};
export const SHOW_POST_ERROR = 'SHOW_POST_ERROR';
export const showPostError = (error) => {
    return ({
        type: SHOW_POST_ERROR,
        payload: error
    })
};

export const REMOVE_POST_ERRORS = 'REMOVE_POST_ERRORS';
export const removePostErrors = () => {
    return ({
        type: REMOVE_POST_ERRORS
    })
};
