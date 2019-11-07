import React from "react";

import PostItem from "../PostItem/PostItem";
import './PostsList.css';

const PostsList = ({ posts, onDelete }) => {

    const elements = posts.map( (post) => {
        const { ...postProps } = post;
        return (
            <div className="list-group-item posts-list-item" key={ post.id }>
                <PostItem { ...postProps } onDelete={ () => onDelete( post.id ) } />
            </div>
        );
    } );

    return (
        <div className="list-group posts-list">
            { elements }
        </div>
    );
};

export default PostsList;
