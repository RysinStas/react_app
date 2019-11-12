import React from "react";
import styled from "styled-components";
import Post from "./Post";

const PostsListItem = styled.div`
    margin-bottom: .25rem;
    padding: .75rem 1.25rem;      
    overflow: auto;  
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
`;

const PostsList = ({ posts, onDelete }) => {
    return (
        <div>{ posts.map( (post) => {
            return (
                <PostsListItem key={post.id}>
                    <Post {...post} onDelete={ () => onDelete(post)} />
                </PostsListItem>
            );
        } ) }
        </div>
    );
};

export default PostsList;
