import uuid from "uuid";

export const postsLoaded = (posts) => {
    return {
        type: 'FETCH_POSTS',
        posts
    }
};

export const addPost = (content) => {
    return {
        type: 'ADD_POST',
        post: {
            id: uuid.v4(),
            content: content,
            user: 'admin',
            created_at: Date.now()
        }
    }
};

export const deletePost = (post) => {
    return {
        type: 'DELETE_POST',
        post
    }
};


