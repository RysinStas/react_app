import {Col, Icon, Row} from "antd";
import RegistrationForm from "../RegistrationForm";
import React from "react";
import {connect} from "react-redux";
import * as actions from "../../store/twitter/twitter-actions";

const SignUpPage = ({loading}) => {
    return (
        <Row>
            <Col span={8} offset={8}>
                { loading ? <Icon type="loading" style={{fontSize: '50px', margin: '33.3333%'}}/> : <RegistrationForm /> }
            </Col>
        </Row>
    );
};

const mapStateToProps = ({loading, err, username}) => {
    return {loading, err, username}
};
export default connect(mapStateToProps,actions)(SignUpPage);