import React from "react";
import styled from "styled-components";

const TextCenter = styled.h1`
    text-align: center;
    font-size: 3rem;
    font-weight: 400;`;

const AppHeader = () => {
    return  <TextCenter>Twitter App</TextCenter>;
};

export default AppHeader;