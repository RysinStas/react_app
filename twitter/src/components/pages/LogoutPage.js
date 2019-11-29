import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom"
import * as actions from "../../store/twitter/twitter-actions";
import AppHeader from "../AppHeader";
import {Col, Row, Button} from "antd"

const LogoutPage = ({history, userLogout}) => {
    return (
        <>
            <AppHeader />
            <Row>
                <Col span={8} offset={8} style={{textAlign: 'center'}}>
                    <h3 >Are you sure?</h3>
                    <Button type="primary" style={{marginRight: '5px'}} onClick={() => history.push('/feed')}>Cancel</Button>
                    <Button type="danger" onClick={() => {
                        userLogout();
                        history.push('/feed');
                    }}>Logout</Button>
                </Col>
            </Row>
        </>
    );
};


export default connect(null, actions)(withRouter(LogoutPage));