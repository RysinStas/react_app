import React from 'react';
import moment from "moment";
import styled from "styled-components";
import {Button, Col, Row} from 'antd';
import 'antd/dist/antd.css';

import * as actions from '../store/twitter/twitter-actions';
import {connect} from "react-redux";
import PostEditForm from "./PostEditForm";
import {Link} from "react-router-dom";

// import replace from 'lodash/replace';

const PostContent = styled.div`
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    font-size: 15px;
    overflow: auto;
    max-height: 500px;
    white-space: pre-line;   
`;

const PostInfo = styled.div`
    font-size: 10px;
    overflow: auto;     
`;

const ButtonWrapper = styled.div`
    margin: 5px 0;  
`;

const PostEditFormWrapper = styled.div`
    padding: 15px 15px 0 ;   
`;

class Post extends React.Component {

    state = {
        editFormShow: false
    };

    showEditForm = () => {
        this.setState({
            editFormShow: !this.state.editFormShow
        })
    };

    postDeleteHandler = () => {
        const {post, deletePostAndFetchPosts} = this.props;
        deletePostAndFetchPosts(post);
    };

    filterContent = (post) => {
        const regAll = /([#@]\w\S*)/g;
        const regHashteg = /([#]\w\S*)/g;
        const regMention= /([@]\w\S*)/g;
        const parts = post.content.split(regAll);

        return parts.map(part => {
            if (part.match(regHashteg)){
                return <Link key={part} to={`/hashtag/${part.replace('#','')}`} >{part}</Link>
            } else if (part.match(regMention)) {
                return <Link key={part} to={`/mentions/${part.replace('@','')}`} >{part}</Link>
            } else {
                return part
            }
            // (part.match(regHashteg) ? <Link key={part} to={`/hashtag/${part.replace('#','')}`} >{part}</Link> : part)
        })
    };

    render() {
        const {post, account} = this.props;
        return (
            <>

                <Row type="flex" align="bottom">
                    <Col span={23} style={{paddingRight: '10px'}}>
                        <Row>
                            <PostContent>{this.filterContent(post)}</PostContent>
                            {/*<PostContent>{parts.map(part => (part.match(regHash) ? <Link key={part} to={`/hashtag/${part.replace('#','')}`} >{part}</Link> : part))}</PostContent>*/}
                            {/*<PostContent>{parts.map(part => (part.match(regHash) ? <Link key={part} to={{ pathname: `hashtag/${part.replace('#','')}` }} >{part}</Link> : part))}</PostContent>*/}
                            <PostInfo>
                                <Col span={8}>created by {post.user.name}</Col>
                                <Col span={8} offset={8} style={{textAlign:'right'}}>{ moment(post.updated_at).format('LLL')}</Col>
                            </PostInfo>
                        </Row>
                    </Col>
                    <Col span={1}>
                        {account.name===post.user.name &&
                            <>
                                <ButtonWrapper>
                                    <Button type="primary" size="small" icon="edit"
                                            onClick={this.showEditForm}>
                                    </Button>
                                </ButtonWrapper>
                                <ButtonWrapper>
                                    <Button type="danger" size="small" icon="delete"
                                            onClick={this.postDeleteHandler}>
                                    </Button>
                                </ButtonWrapper>
                            </>
                        }
                    </Col>
                </Row>
                { this.state.editFormShow &&
                    <Row type="flex" align="bottom">
                        <Col span={23}>
                            <PostEditFormWrapper>
                                <PostEditForm post={post} showEditForm ={this.showEditForm}/>
                            </PostEditFormWrapper>
                        </Col>
                    </Row>
                }
            </>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        account : state.auth.account
    }
};

export default connect(mapStateToProps, actions)(Post);