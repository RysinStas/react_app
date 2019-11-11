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

    state = {
        posts: []
    };

    componentDidMount() {
        const posts = JSON.parse(localStorage.getItem('posts')) ;
        if (posts) {
            this.setState({posts});
        }
    }

    addPost = (text) => {
        const newPost = {
            id: uuid.v4(),
            content: text,
            user: 'admin',
            created_at: Date.now()
        };

        const posts = [...this.state.posts, newPost];
        this.setState({posts});
        localStorage.setItem('posts', JSON.stringify(posts));
        // this.setState((state) => {
        //     const {posts} = state;
        //     localStorage.setItem('posts', JSON.stringify([newPost, ...posts]));
        //
        //     return {
        //         posts: [newPost, ...posts ]
        //     };
        // });
        // console.log(this.state);
    };

    deletePost = (deletedPost) => {
        this.setState( (state) => {
            const shallowCopyPosts = [...state.posts];
            console.log('State before is:', state);
            const postArrIndex = shallowCopyPosts.findIndex((post) => post.id === deletedPost.id);
            shallowCopyPosts.splice( postArrIndex, 1);
            localStorage.setItem('posts', JSON.stringify(shallowCopyPosts));
            console.log('State is:', state);
            return { posts: shallowCopyPosts }

            // const { posts } = state,
            //     postArrIndex = posts.findIndex( (post) => post.id === deletedPost.id ),
            //     shallowCopyPosts = [...state.posts],
            //     resultArray = shallowCopyPosts.splice(postArrIndex, 1);
            // console.log('State is:', state);
            // return {posts: resultArray }
        });

    };


    render() {
        console.log(this.state);
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