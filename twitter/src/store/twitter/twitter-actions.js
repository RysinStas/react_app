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
        meta: {content, username}
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
        meta: {post}
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