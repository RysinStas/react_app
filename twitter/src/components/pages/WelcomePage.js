import {Col, Row} from "antd";
import React from "react";
import AppHeader from "../AppHeader";

const WelcomePage = () => {
    return (
        <>
            <AppHeader />
            <Row>
                <Col span={8} offset={8}>
                    <h2>Welcome to App</h2>
                    <div>To use this application, please login.</div>
                </Col>
            </Row>
        </>
    );
};

export default WelcomePage