import React from 'react';

import AppHeader from './AppHeader';
import styled from "styled-components";
import {connect} from "react-redux";
import {fetchPosts} from "../store/twitter/twitter-actions"

import { Route, BrowserRouter as Router} from "react-router-dom"

import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import FeedPage from "./pages/FeedPage"
import SignUpPage from "./pages/SignUpPage"
import WelcomePage from "./pages/WelcomePage";


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
                <Router>
                    <AppHeader />
                    <Route path="/" component={WelcomePage} exact/>
                    <Route path="/feed" component={FeedPage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/logout" component={LogoutPage}/>
                    <Route path="/registration" component={SignUpPage}/>
                </Router>
            </Container>
        );
    }
}

export default connect()(App);