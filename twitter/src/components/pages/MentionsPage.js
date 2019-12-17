import React from "react";
import {connect} from "react-redux";
import {Pagination} from "antd";
import styled from "styled-components";
import AppHeader from "../AppHeader";
import PostsList from "../post/PostsList";
import {fetchPosts} from "../../store/twitter/twitter-actions";
import {showErrors} from "../../store/errors/errors-actions";

const PaginationStyle = styled.ul`
  margin: 20px 0;
  padding: 0;
  text-align: center;
`;

class MentionsPage extends React.Component {

    state = {
        name: ''
    };

    async componentDidMount() {
        this.setState({
            name: this.props.match.params.name
        });
        this.fetchMentions(1, this.props.match.params.name )
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.name!==this.props.match.params.name) {
            this.setState({
                name: this.props.match.params.name
            });
            this.fetchMentions(1,this.props.match.params.name );
        }
    }

    fetchMentions = async (page, mentions) => {
        try {
            await this.props.fetchPosts({page, mentions});
        } catch (error) {
            this.props.showErrors(error.payload.response);
        }
    };

    render () {
        const {posts} = this.props;
        return (
            <>
                <AppHeader />
                <h2> All tweets with @{this.state.name} mention</h2>
                <PostsList />
                <PaginationStyle>
                    <Pagination defaultCurrent={1}
                                defaultPageSize={5}
                                current={posts.current_page}
                                pageSize={posts.per_page}
                                total={posts.total}
                                onChange={(page)=>this.fetchMentions(page,this.state.name)}
                                hideOnSinglePage={true}
                    />
                </PaginationStyle>
            </>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        posts: state.feed
    }
};
export default connect(mapStateToProps, {fetchPosts, showErrors})(MentionsPage);