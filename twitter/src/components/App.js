import React from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import Navigation from "./navigation/Navigation";
import * as actions from "../store/auth/auth-actions"

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
        this.props.appInit();
    }

    render() {
        return (
            <Container>
                    <Navigation/>
            </Container>

        );
    }
}

export default connect(null, actions)(App);