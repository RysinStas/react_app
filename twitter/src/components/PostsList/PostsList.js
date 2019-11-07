import React from "react";

import PostItem from "../PostItem/PostItem";
import './PostsList.css';

const PostsList = ({ posts, onDelete }) => {

    const elements = posts.map( (post) => {
        const { ...postProps } = post;
        return (
            <li className="list-group-item posts-list-item" key={ post.id }>
                <PostItem { ...postProps } onDelete={ () => onDelete( post.id ) } />
            </li>
        );
    } );

    return (
        <ul className="list-group posts-list">
            { elements }
        </ul>
    );
};

export default PostsList;
