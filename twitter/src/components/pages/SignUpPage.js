import {Col, Icon, Row} from "antd";
import RegistrationForm from "../RegistrationForm";
import React from "react";
import {connect} from "react-redux";

const SignUpPage = ({pending}) => {
    return (
        <Row>
            <Col span={8} offset={8}>
                { pending ? <Icon type="loading" style={{fontSize: '50px', margin: '33.3333%'}}/> : <RegistrationForm /> }
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    return {
        pending: state.auth.pending,
        username: state.auth.username,
        error: state.auth.error
    }
};
export default connect(mapStateToProps)(SignUpPage);