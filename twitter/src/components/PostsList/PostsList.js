import React from "react";
import styled from "styled-components";

import Post from "../Post/Post";

const StyledList = styled.div `
    // padding: .25rem .75rem;
`;
const StyledListItem = styled.div `
    margin-bottom: .25rem;
    padding: .75rem 1.25rem;      
    overflow: auto;  
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
`;

const PostsList = ({ posts, onDelete }) => {
    return (
        <StyledList>{ posts.map( (post) => {
            const {...postProps} = post;
            return (
                <StyledListItem key={post.id}>
                    <Post {...postProps} onDelete={ () => onDelete(post)} />
                </StyledListItem>
            );
        } ) }
        </StyledList>
    );
};

export default PostsList;
