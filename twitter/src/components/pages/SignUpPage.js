import {Col, Icon, Row} from "antd";
import RegistrationForm from "../RegistrationForm";
import React from "react";
import {connect} from "react-redux";

const SignUpPage = ({loading}) => {
    return (
        <Row>
            <Col span={8} offset={8}>
                { loading ? <Icon type="loading" style={{fontSize: '50px', margin: '33.3333%'}}/> : <RegistrationForm /> }
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        username: state.auth.username,
        error: state.auth.error
    }
};
export default connect(mapStateToProps)(SignUpPage);