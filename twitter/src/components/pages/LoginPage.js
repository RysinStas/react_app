import {Col, Row, Icon} from "antd";
import LoginForm from "../LoginForm";
import React from "react";
import {connect} from "react-redux";
import * as actions from "../../store/twitter/twitter-actions";

const LoginPage = ({loading}) => {
    return (
        <Row>
            <Col span={8} offset={8}>
                { loading ? <Icon type="loading" style={{fontSize: '50px', margin: '33.3333%'}}/> : <LoginForm /> }
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    return {
        loading:  state.auth.loading
    }
};
export default connect(mapStateToProps,actions)(LoginPage);