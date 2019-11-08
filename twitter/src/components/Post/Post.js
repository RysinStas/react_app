import React from 'react';
import moment from "moment";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/all";

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
    line-height: 1.5rem;
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
const PostButtonsBlock = styled.div`
    width: 5%;
    overflow: auto;
    display: inline-block;
    text-align: right;
`;
const Button = styled.button`
    display: inline-block;
    padding: .15rem  
    color: #dc3545;
    background-color: transparent; 
    border: 1px solid #dc3545;      
    border-radius: .25rem;
    text-transform: capitalize; 
    font-weight: 400;
    vertical-align: middle; 
    cursor: pointer;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    :hover {
        color: #ffffff;
        text-decoration: none;
        background-color: #dc3545;
        // border-color: #6c757d;
    }    
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
                <PostButtonsBlock>
                    <Button type="button"
                            //className="btn btn-outline-danger btn-sm"
                            onClick={onDelete}>
                        <FaTrashAlt/>
                        {/*<i className="fa fa-trash-o"/>*/}
                    </Button>
                </PostButtonsBlock>

            </article>
        );
    }
}

export default Post;