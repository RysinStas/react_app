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

const AppHeader = ({errors}) => {
    return  (
        <HeaderWrapper>
            {errors.map( (error, i) => {
                return (
                    <Alert
                        key={i}
                        message="Error"
                        description={error.message}
                        type="error"
                        showIcon
                        style={{marginBottom: '5px'}}
                    />
                );
            })}
            <Title>App</Title>
            <NavigationMenu />
        </HeaderWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        errors: [...state.feed.error, ...state.auth.error]
    }
};

export default connect(mapStateToProps)(AppHeader);