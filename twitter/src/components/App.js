import React from 'react';

import styled from "styled-components";
import {connect} from "react-redux";
import {fetchPosts} from "../store/twitter/twitter-actions"
import Navigation from "./Navigation";


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
        this.props.dispatch(fetchPosts());
    }

    render() {
        return (
            <Container>
                <Navigation/>
            </Container>
        );
    }
}

export default connect()(App);