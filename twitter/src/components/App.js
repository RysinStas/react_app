import React from 'react';
import uuid from 'uuid';

import AppHeader from './AppHeader/AppHeader';
import PostAddForm from './PostAddForm/PostAddForm';
import PostsList from './PostsList/PostsList';

class App extends React.Component{
    state = {
        posts: [
            {
                id: uuid.v4(),
                content: 'Some text1',
                user: 'admin',
                createDate: Date.now()
            },
            {
                id: uuid.v4(),
                content: 'Some text2',
                user: 'admin',
                createDate: Date.now()
            },
            {
                id: uuid.v4(),
                content: 'Some text3',
                user: 'admin',
                createDate: Date.now()
            },
        ]
    };

    addPost = (text) => {
        const newPost = {
            id: uuid.v4(),
            content: text,
            user: 'admin',
            createDate: Date.now()
        };

        this.setState(({posts}) => {
            return {
                posts: [...posts, newPost]
            };
        });
    };

    deletePost = (id) => {
        this.setState( ({posts}) => {
            const postArrIndex = posts.findIndex( (post) => post.id === id );
            posts.splice( postArrIndex, 1);
            return posts;
        });
    };

    render() {
        const { posts } = this.state;
        return (
            <div className="container">
                <AppHeader />
                <PostAddForm
                    onAddPost={this.addPost}/>
                <PostsList
                    posts={posts} onDelete={ (id) => this.deletePost(id) } />
            </div>
        );
    }
}

export default App;