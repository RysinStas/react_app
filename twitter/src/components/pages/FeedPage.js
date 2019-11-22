import PostAddForm from "../PostAddForm";
import PostsList from "../PostsList";
import React from "react";
import {connect} from "react-redux";
import {Pagination} from "antd";
import * as actions from "../../store/twitter/twitter-actions"
import styled from "styled-components";

const PaginationStyle = styled.ul`
  margin: 20px 0;
  padding: 0;
  text-align: center;
`;

const FeedPage = ({username, posts, fetchPosts}) => {
    const handleChange = (page) => {
        fetchPosts(page);
    };
    if (username) {
        return (
            <div>
                <h2>Hello {username}!</h2>
                <PostAddForm />
                <PostsList />
                <PaginationStyle>
                    <Pagination defaultCurrent={1}
                                defaultPageSize={5}
                                pageSize={posts.per_page}
                                total={posts.total}
                                onChange={(page)=>handleChange(page)}
                                hideOnSinglePage={true}
                    />
                </PaginationStyle>
            </div>
        );
    }
    return (
        <div>
            <h2>Hello! To write a tweet please register or login</h2>
            <PostsList />
        </div>
    );
};
const mapStateToProps = (state) =>{
    return {
        username: state.auth.username,
        posts: state.feed
    }
};
export default connect(mapStateToProps,actions)(FeedPage);