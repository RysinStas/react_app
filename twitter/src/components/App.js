import React from 'react';

import styled from "styled-components";
import {connect} from "react-redux";
// import {fetchPosts} from "../store/twitter/twitter-actions"
import Navigation from "./Navigation";
import {USER_LOGIN_SUCCESS} from "../store/twitter/twitter-actions";


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
        const username = localStorage.getItem('username');
        const access_token = localStorage.getItem('access_token');
        if ( username && access_token) {
            this.props.dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    username,
                    access_token
                }
            });
        }
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