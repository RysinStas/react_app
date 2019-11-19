import React from 'react';

import AppHeader from './AppHeader';
import PostAddForm from './PostAddForm';
import PostsList from './PostsList';
import styled from "styled-components";
import {connect} from "react-redux";
import {fetchPosts} from "../store/twitter/twitter-actions"

import { Route, BrowserRouter as Router} from "react-router-dom"

import {Row, Col} from "antd";
import RegistrationForm from "./RegistrationForm";
import SecretPage from "./pages/SecretPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import FeedPage from "./pages/FeedPage"
import SignUpPage from "./pages/SignUpPage"


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
                    <Route path="/" component={Welcome} exact/>
                    <Route path="/feed" component={FeedPage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/logout" component={LogoutPage}/>
                    <Route path="/registration" component={SignUpPage}/>
                    <Route path="/secret" component={SecretPage}/>
                </Router>
            </Container>
        );
    }
}

const Welcome = () => {
    return (
        <Row>
            <Col span={8} offset={8}>
                <h2>Welcome to App</h2>
            </Col>
        </Row>
    );
};

export default connect()(App);