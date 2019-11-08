import React from 'react';
import uuid from 'uuid';

import AppHeader from './AppHeader/AppHeader';
import PostAddForm from './PostAddForm/PostAddForm';
import PostsList from './PostsList/PostsList';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    max-width: 720px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
`;

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

        this.setState((state) => {
            const {posts} = state;
            localStorage.setItem('posts', JSON.stringify([newPost, ...posts]));

            return {
                posts: [newPost, ...posts ]
            };
        });
        console.log(this.state);
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
            <Container className="container">
                <AppHeader />
                <PostAddForm
                    onAddPost={this.addPost}
                />
                <PostsList
                    posts={posts}
                    onDelete={(id) => this.deletePost(id)}
                />
            </Container>
        );
    }
}

export default App;