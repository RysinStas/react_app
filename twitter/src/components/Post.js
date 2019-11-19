import React from 'react';
import moment from "moment";
import styled from "styled-components";
import {Button, Col, Row} from 'antd';
import 'antd/dist/antd.css';

import * as actions from '../store/twitter/twitter-actions';
import {connect} from "react-redux";


const PostContent = styled.div`
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    font-size: small;
    overflow: auto;
    max-height: 500px;
    white-space: pre-line;   
`;

const Post = ({post, deletePost, username}) => {
    if (username===post.user) {
        return (
            <Row type="flex" align="bottom" gutter={8}>
                <Col span={23}>
                    <Row>
                        <PostContent>{post.content}</PostContent>
                        <Col span={8}>created by {post.user}</Col>
                        <Col span={8} offset={8}>{ moment(post.created_at).format('LLL')}</Col>
                    </Row>
                </Col>
                <Col span={1}>
                    <Button type="danger" size="small" icon="delete"
                            onClick={() => deletePost(post)}>
                    </Button>
                </Col>
            </Row>
        );
    }
    return (
        <Row type="flex" align="bottom" gutter={8}>
            <Col span={23}>
                <Row>
                    <PostContent>{post.content}</PostContent>
                    <Col span={8}>created by {post.user}</Col>
                    <Col span={8} offset={8}>{ moment(post.created_at).format('LLL')}</Col>
                </Row>
            </Col>
            <Col span={1}>

            </Col>
        </Row>
    );
};
const mapStateToProps = ({username}) => {
    return {username}
};

export default connect(mapStateToProps, actions)(Post);