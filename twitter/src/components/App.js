import React from 'react';

import AppHeader from './AppHeader';
import PostAddForm from './PostAddForm';
import PostsList from './PostsList';
import styled from "styled-components";
import {connect} from "react-redux";
import {fetchPosts} from "../store/twitter/twitter-actions"

import { Route, Link, BrowserRouter as Router} from "react-router-dom"
import LoginForm from "./LoginForm";
import {Row, Col} from "antd";
import RegistrationForm from "./RegistrationForm";


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
                    <Route path="/feed" component={Feed}/>
                    <Route path="/login" component={SignIn}/>
                    <Route path="/registration" component={SignUp}/>
                    {/*<PostAddForm />*/}
                    {/*<PostsList />*/}
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

const Feed = () => {
    return (
        <div>
            <h2>Feed</h2>
            <PostAddForm />
            <PostsList />
        </div>
    );
};
const SignIn = () => {
    return (
        <Row>
            <Col span={8} offset={8}>
                <LoginForm />
            </Col>
        </Row>
    );
};

const SignUp = () => {
    return (
        <Row>
            <Col span={8} offset={8}>
                <RegistrationForm />
            </Col>
        </Row>
    );
};

export default connect()(App);