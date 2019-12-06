import {Col, Row} from "antd";
import React from "react";
import AppHeader from "../AppHeader";
import {connect} from "react-redux";

const WelcomePage = ({account}) => {
    return (
        <>
            <AppHeader/>
            <Row>
                <Col span={8} offset={8}>
                    <h2>Welcome to App</h2>
                    {account.name ?
                        <div>Select a "Feed" in the menu to see tweets </div>
                        :
                        <div>To use this application, please login.</div>}

                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        account:  state.auth.account
    }
};

export default connect(mapStateToProps)(WelcomePage)