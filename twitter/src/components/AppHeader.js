import React from "react";
import styled from "styled-components";
import NavigationMenu from "./NavigationMenu";
import {Alert} from "antd";
import {connect} from "react-redux";

const Title = styled.h1`
    text-align: center;
    font-size: 3rem;
    font-weight: 400;
`;
const HeaderWrapper = styled.div`
    margin-bottom: 30px;
`;

const AppHeader = ({error}) => {

    return  (
        <HeaderWrapper>
            { error.length !== 0 &&
                <Alert
                    message="Error"
                    description={error.toString()}
                    type="error"
                    showIcon
                />
            }
            <Title>App</Title>
            <NavigationMenu />
        </HeaderWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.feed.error
    }
};

export default connect(mapStateToProps)(AppHeader);