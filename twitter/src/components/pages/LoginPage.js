import {Col, Row, Icon} from "antd";
import LoginForm from "../LoginForm";
import React from "react";
import {connect} from "react-redux";
import * as actions from "../../store/twitter/twitter-actions";
import AppHeader from "../AppHeader";

const LoginPage = ({pending}) => {
    return (
        <>
            <AppHeader />
            <Row>
                <Col span={8} offset={8}>
                    { pending ? <Icon type="loading" style={{fontSize: '50px', margin: '33.3333%'}}/> : <LoginForm /> }
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        pending:  state.auth.pending
    }
};
export default connect(mapStateToProps,actions)(LoginPage);