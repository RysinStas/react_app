import React from "react";
import styled from "styled-components";
import Post from "./Post";
import {connect} from "react-redux";

const PostsListItem = styled.div`
    margin-bottom: .25rem;
    padding: 12px;      
    overflow: auto;  
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
`;

const PostsList = ({posts}) => {
    return (
        <>{posts.data.map( (post) => {
            return (
                <PostsListItem key={post.id}>
                    <Post post={post} />
                </PostsListItem>
            );
        })}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        posts: state.feed
    }
};

export default  connect(mapStateToProps)(PostsList);
