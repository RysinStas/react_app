import React from 'react';
import uuid from 'uuid';

import AppHeader from './AppHeader/AppHeader';
import PostAddForm from './PostAddForm/PostAddForm';
import PostsList from './PostsList/PostsList';

class App extends React.Component {
    // Local post storage
    localPosts = JSON.parse(localStorage.getItem('posts'));

    state = {
        posts: this.localPosts ? this.localPosts : []
    };

    addPost = (text) => {
        const newPost = {
            id: uuid.v4(),
            content: text,
            user: 'admin',
            createDate: Date.now()
        };

        this.setState(({posts}) => {
            localStorage.setItem('posts', JSON.stringify([...posts, newPost]));

            return {
                posts: [...posts, newPost]
            };
        });
    };

    deletePost = (id) => {
        this.setState( ({posts}) => {
            const postArrIndex = posts.findIndex((post) => post.id === id);
            posts.splice( postArrIndex, 1);
            localStorage.setItem('posts', JSON.stringify(posts));

            return posts;
        });
    };

    render() {
        const { posts } = this.state;
        return (
            <div className="container">
                <AppHeader />
                <PostAddForm
                    onAddPost={this.addPost}
                />
                <PostsList
                    posts={posts}
                    onDelete={(id) => this.deletePost(id)}
                />
            </div>
        );
    }
}

export default App;