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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.post !== this.state.posts){
            localStorage.setItem('posts', JSON.stringify(this.state.posts));
        }
    }

    addPost = (text) => {
        const posts = [
            ...this.state.posts,
            {
                id: uuid.v4(),
                content: text,
                user: 'admin',
                created_at: Date.now()
            }];
        this.setState({posts});
    };

    deletePost = (deletedPost) => {
        this.setState( (state) => {
            const shallowCopyPosts = [...state.posts],
            postArrIndex = shallowCopyPosts.findIndex((post) => post.id === deletedPost.id);
            shallowCopyPosts.splice( postArrIndex, 1);

            return { posts: shallowCopyPosts }
        });
    };

    render() {
        const { posts } = this.state;
        return (
            <Container>
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