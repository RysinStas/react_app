import React, {useEffect} from "react";
import styled from "styled-components";
import Post from "./Post";

import {connect} from "react-redux";
import * as actions from "../actions"

const PostsListItem = styled.div`
    margin-bottom: .25rem;
    padding: .75rem 1.25rem;      
    overflow: auto;  
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
`;

const PostsList = ({posts, postsLoaded}) => {

    useEffect(() => {
        const response = JSON.parse(localStorage.getItem('posts')) ;
        if (response) {
            postsLoaded(response);
        }
    }, []);

    return (
        <div>{posts.map( (post) => {
            return (
                <PostsListItem key={post.id}>
                    <Post post={post} />
                </PostsListItem>
            );
        })}
        </div>
    );
};

const mapStateToProps = ({posts}) => {
    return {posts}
};

export default  connect(mapStateToProps, actions)(PostsList);
