// import PostAddForm from "../PostAddForm";
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

class NotificationsPage extends React.Component {

    state = {
        hashtag: ''
    };

    componentDidMount() {
        const {account} = this.props;
        this.props.fetchPostsMentions(1, account.name );
    }

    handleChange = (page) => {
        const {account} = this.props;
        this.props.fetchPostsMentions(page, account.name);
    };

    render () {

        const {posts} = this.props;
        return (
            <>
                <AppHeader />
                {posts.posts.length ? <><h3>Someone mentioned you on a tweet</h3><PostsList /></> : <><h2>There is no information yet</h2>
                    <h3>If someone mentions you on a tweet, it will display here.</h3></> }
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
        posts: state.feed,
        account: state.auth.account
    }
};
export default connect(mapStateToProps, actions)(NotificationsPage);