import React from 'react';
import moment from "moment";
import styled from "styled-components";

const PostWrapper = styled.div`
    width: 95%;
    display: inline-block;
    text-align: left;
`;
const PostInfo = styled.div`
    padding-top: 0.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    font-size: small;
    color: #708090;
`;
const PostContent = styled.div`
    overflow: auto;
    max-height: 500px;
`;
const PostInfoUser = styled.div`
    width: 50%;
    display: inline-block;
    text-align: left;
`;
const PostInfoDate = styled.div`
    width: 50%;
    display: inline-block;
    text-align: right;
`;
const PostButtons = styled.div`
    width: 5%;
    overflow: auto;
    display: inline-block;
    text-align: right;
`;

class Post extends React.Component {

    render() {
        const {content, user, createDate, onDelete} = this.props;
        return (
            <article>
                <PostWrapper>
                    <PostContent>
                        <span>{content}</span>
                    </PostContent>
                    <PostInfo >
                        <PostInfoUser>create by {user}</PostInfoUser>
                        <PostInfoDate>{ moment(createDate).format('LLL')}</PostInfoDate>
                    </PostInfo>
                </PostWrapper>
                <PostButtons className="post-buttons ">
                    <button type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={onDelete}>
                        <i className="fa fa-trash-o"/>
                    </button>
                </PostButtons>

            </article>
        );
    }
}

export default Post;