import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

const Title = styled.h1`
    text-align: center;
    font-size: 3rem;
    font-weight: 400;
`;
const HeaderWrapper = styled.div`
    margin-bottom: 30px;
`;


const AppHeader = () => {
    return  (
        <HeaderWrapper>
            <Title>App</Title>
            <Navigation />
        </HeaderWrapper>
    );
};

export default AppHeader;