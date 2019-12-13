// import PostAddForm from "../PostAddForm";
import PostsList from "../PostsList";
import React from "react";
import {connect} from "react-redux";
import {Pagination} from "antd";
import * as actions from "../../store/twitter/twitter-actions"
import styled from "styled-components";
import AppHeader from "../AppHeader";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect,
//     useParams,
//     useRouteMatch
// } from "react-router-dom";

const PaginationStyle = styled.ul`
  margin: 20px 0;
  padding: 0;
  text-align: center;
`;

class MentionsPage extends React.Component {

    state = {
        hashtag: ''
    };

    componentDidMount() {
        this.setState({
            hashtag: this.props.match.params.name
        });
        this.props.fetchPostsMentions(1,this.props.match.params.name );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.name!==this.props.match.params.name) {
            this.setState({
                hashtag: this.props.match.params.name
            });
            this.props.fetchPostsMentions(1,this.props.match.params.name );
        }
    }

    handleChange = (page) => {
        this.props.fetchPostsMentions(page, this.state.hashtag);
    };

    render () {

        const {posts} = this.props;
        return (
            <>
                <AppHeader />
                <h2> @{this.state.hashtag}</h2>
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
        posts: state.feed
    }
};
export default connect(mapStateToProps, actions)(MentionsPage);