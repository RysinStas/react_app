import React from 'react';

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
    return (
        <Container>
            <AppHeader />
            <PostAddForm />
            <PostsList />
        </Container>
    );
};

export default App;