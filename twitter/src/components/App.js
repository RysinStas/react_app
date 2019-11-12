import React, {useState, useEffect} from 'react';
import uuid from 'uuid';
import AppHeader from './AppHeader';
import PostAddForm from './PostAddForm';
import PostsList from './PostsList';
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    max-width: 720px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;     
`;

const App = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const response = JSON.parse(localStorage.getItem('posts')) ;
            if (response) {
                setPosts(response);
            }
    }, []);

    // Posts update hook
    useEffect(() => localStorage.setItem('posts', JSON.stringify(posts)), [posts]);

    const addPost = (content) => {
        setPosts( [
            ...posts,
            {
                id: uuid.v4(),
                content: content,
                user: 'admin',
                created_at: Date.now()
            }] );
    };

    const deletePost = (deletedPost) => {
        setPosts(posts.filter((post) => post.id !== deletedPost.id));
    };

    return (
        <Container>
            <AppHeader />
            <PostAddForm
                onAddPost={addPost}
            />
            <PostsList
                posts={posts}
                onDelete={(post) => deletePost(post)}
            />
        </Container>
    );
};

export default App;