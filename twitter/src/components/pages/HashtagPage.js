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

class HashtagPage extends React.Component {
    state = {
        hashtag: ''
    };

    componentDidMount() {
        console.log('did mount hash tag');
        this.setState({
            hashtag: this.props.match.params.name
        });
        this.props.fetchPosts(1,this.props.match.params.name );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps===this.props) {
            this.props.fetchPosts(1,this.props.match.params.name );
        }
        console.log('did UPDATE hash tag');
        // this.setState({
        //     hashtag: this.props.match.params.name
        // });
        // this.props.fetchPosts(1,this.props.match.params.name );
    }

    handleChange = (page) => {
        this.props.fetchPosts(page, this.state.hashtag);
    };

    render () {
        console.log(this.props.match.params.name);

        const {account, posts} = this.props;
        return (
            <>
                <AppHeader />
                <h2> #{this.state.hashtag}</h2>
                {/*<PostAddForm />*/}
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
export default connect(mapStateToProps, actions)(HashtagPage);