import React from "react";
import styled from "styled-components";
import NavigationMenu from "./NavigationMenu";
import {connect} from "react-redux";

import {Modal, Collapse, } from 'antd';
import {removeAuthErrors} from "../store/auth/auth-actions";
import {removePostErrors} from "../store/twitter/twitter-actions";

const { Panel } = Collapse;

const Title = styled.h1`
    text-align: center;
    font-size: 3rem;
    font-weight: 400;
`;
const HeaderWrapper = styled.div`
    margin-bottom: 30px;
`;

const actionCreators = {
    removeAuthErrors,
    removePostErrors
};

class AppHeader extends React.Component {

    componentDidUpdate (prevProps, prevState, snapshot) {
        if (this.props.error.length) {
            this.showError();
        }
    }

    showError = () => {
        const {error} = this.props;
        Modal.error({
            title: 'Something went wrong',
            content: (
                <div>
                    <h4>Please re-login or try later</h4>
                    <Collapse accordion >
                        { error.map((item, index)=>(
                            <Panel header="Error log" key={index}>
                                <p>Error type: {item.type}</p>
                            </Panel>
                        ) )}
                    </Collapse>
                </div>
            ),
            onOk:() => {
                this.props.removeAuthErrors();
                this.props.removePostErrors()
            },
        });
    };

    render() {
        return (
            <HeaderWrapper>
                <Title>App</Title>
                <NavigationMenu/>
            </HeaderWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error
    }
};

export default connect(mapStateToProps, actionCreators)(AppHeader);