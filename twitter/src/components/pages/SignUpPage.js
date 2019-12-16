import {Col, Icon, Row} from "antd";
import RegistrationForm from "../auth/RegistrationForm";
import React from "react";
import {connect} from "react-redux";
import AppHeader from "../AppHeader";

const SignUpPage = ({pending}) => {
    return (
        <>
            <AppHeader />
            <Row>
                <Col span={8} offset={8}>
                    { pending ? <Icon type="loading" style={{fontSize: '50px', margin: '33.3333%'}}/> : <RegistrationForm /> }
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        pending: state.auth.pending
    }
};
export default connect(mapStateToProps)(SignUpPage);