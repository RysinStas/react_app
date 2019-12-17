import PostsList from "../post/PostsList";
import React from "react";
import {connect} from "react-redux";
import {Pagination} from "antd";
import {fetchPosts} from "../../store/twitter/twitter-actions"
import {showErrors} from "../../store/errors/errors-actions"

import styled from "styled-components";
import AppHeader from "../AppHeader";
import {withRouter} from "react-router-dom";

const PaginationStyle = styled.ul`
  margin: 20px 0;
  padding: 0;
  text-align: center;
`;

class NotificationsPage extends React.Component {

    async componentDidMount() {
        this.fetchMentions(1, this.props.account.name)
    }

    fetchMentions = async (page, mentions) => {
        try {
            await this.props.fetchPosts({page, mentions});
        } catch (error) {
            this.props.showErrors(error.payload.response);
        }
    };

    render() {
        const {posts, account} = this.props;
        return (
            <>
                <AppHeader/>
                {posts.posts.length ? <><h3>Someone mentioned you on a tweet</h3><PostsList/></> : <><h2>There is no
                    information yet</h2>
                    <h3>If someone mentions you on a tweet, it will display here.</h3></>}
                <PaginationStyle>
                    <Pagination defaultCurrent={1}
                                defaultPageSize={5}
                                current={posts.current_page}
                                pageSize={posts.per_page}
                                total={posts.total}
                                onChange={(page) => this.fetchMentions(page, account.name)}
                                hideOnSinglePage={true}
                    />
                </PaginationStyle>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.feed,
        account: state.auth.account
    }
};
export default connect(mapStateToProps, {fetchPosts, showErrors})(withRouter(NotificationsPage));