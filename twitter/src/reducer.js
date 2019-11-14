const initialState = {
    posts: []
};

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case 'FETCH_POSTS':
            return {
                ...state,
                posts: actions.posts
            };
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, actions.post]
            };
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== actions.post.id)
            };
        default:
            return state;
    }
};

export default reducer;