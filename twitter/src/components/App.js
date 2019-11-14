import React from 'react';

import AppHeader from './AppHeader';
import PostAddForm from './PostAddForm';
import PostsList from './PostsList';
import styled from "styled-components";
import {connect} from "react-redux";
import {fetchPosts} from "../actions"

const Container = styled.div`
    width: 100%;
    max-width: 720px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;     
`;

class App extends React.Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <Container>
                <AppHeader />
                <PostAddForm />
                <PostsList />
            </Container>
        );
    }
}

export default connect(null, {fetchPosts})(App);