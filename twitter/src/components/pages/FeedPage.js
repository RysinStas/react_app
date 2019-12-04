import PostAddForm from "../PostAddForm";
import PostsList from "../PostsList";
import React from "react";
import {connect} from "react-redux";
import {Pagination} from "antd";
import * as actions from "../../store/twitter/twitter-actions"
import styled from "styled-components";
import AppHeader from "../AppHeader";

const PaginationStyle = styled.ul`
  margin: 20px 0;
  padding: 0;
  text-align: center;
`;

class FeedPage extends React.Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    handleChange = (page) => {
        this.props.fetchPosts(page);
    };

    render () {
        const {username, posts} = this.props;
        if (username) {
            return (
                <>
                    <AppHeader />
                    <h2>Hello {username}!</h2>
                    <PostAddForm />
                    <PostsList />
                    <PaginationStyle>
                        <Pagination defaultCurrent={1}
                                    defaultPageSize={5}
                                    current={posts.current_page}
                                    pageSize={posts.per_page}
                                    total={posts.total}
                                    onChange={(page)=>this.handleChange(page)}
                                    hideOnSinglePage={true}
                        />
                    </PaginationStyle>
                </>
            );
        }
        return (
            <>
                <AppHeader />
                <h2>Hello! To write a tweet please register or login</h2>
                <PostsList />
            </>
        );
    }

}

const mapStateToProps = (state) =>{
    return {
        username: state.auth.data.username,
        posts: state.feed.data
    }
};
export default connect(mapStateToProps, actions)(FeedPage);