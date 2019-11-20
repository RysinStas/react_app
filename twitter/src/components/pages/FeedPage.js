import PostAddForm from "../PostAddForm";
import PostsList from "../PostsList";
import React from "react";
import {connect} from "react-redux";

const FeedPage = ({username}) => {
    if (username) {
        return (
            <div>
                <h2>Hello {username}!</h2>
                <PostAddForm />
                <PostsList />
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
        username: state.auth.username
    }
};
export default connect(mapStateToProps)(FeedPage);