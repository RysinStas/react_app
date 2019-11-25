import React from 'react';
import moment from "moment";
import styled from "styled-components";
import {Button, Col, Row} from 'antd';
import 'antd/dist/antd.css';

import * as actions from '../store/twitter/twitter-actions';
import {connect} from "react-redux";
import PostEditForm from "./PostEditForm";


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

class  Post extends React.Component {

    state = {
        editFormShow: false
    };

    showEditForm = () => {
        this.setState({
            editFormShow: !this.state.editFormShow
        })
    };

    postDeleteHandler = () => {
        const {post, deletePost, fetchPosts} = this.props;
        deletePost(post);
        fetchPosts();
    };

    render() {
        const {post} = this.props;
        return (
            <div>
                <Row type="flex" align="bottom">
                    <Col span={23} style={{paddingRight: '10px'}}>
                        <Row>
                            <PostContent>{post.content}</PostContent>
                            <PostInfo>
                                <Col span={8}>created by admin</Col>
                                <Col span={8} offset={8} style={{textAlign:'right'}}>{ moment(post.updated_at).format('LLL')}</Col>
                            </PostInfo>
                        </Row>
                    </Col>
                    <Col span={1}>
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
            </div>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        username : state.auth.username
    }
};

export default connect(mapStateToProps, actions)(Post);