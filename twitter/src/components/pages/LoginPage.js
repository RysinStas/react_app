import {Col, Row, Icon} from "antd";
import LoginForm from "../auth/LoginForm";
import React from "react";
import {connect} from "react-redux";
import AppHeader from "../AppHeader";
import {Redirect} from "react-router-dom";

const LoginPage = ({pending, account}) => {
    return (
        <>
            { account.name && <Redirect to="/feed" />}
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
        pending:  state.auth.pending,
        account: state.auth.account
    }
};
export default connect(mapStateToProps)(LoginPage);