import PostAddForm from "../post/PostAddForm";
import PostsList from "../post/PostsList";
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
        const {account, posts} = this.props;
        return (
            <>
                <AppHeader />
                <h2>Hello {account.name}!</h2>
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

}

const mapStateToProps = (state) =>{
    return {
        account: state.auth.account,
        posts: state.feed
    }
};
export default connect(mapStateToProps, actions)(FeedPage);