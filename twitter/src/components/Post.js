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
    font-size: small;
    overflow: auto;
    max-height: 500px;
    white-space: pre-line;   
`;

const Post = ({post, deletePost, username}) => {
    // if (username===post.username) {
        return (
            <div>
                <Row type="flex" align="bottom" gutter={8}>
                    <Col span={23}>
                        <Row>
                            <PostContent>{post.content}</PostContent>
                            <Col span={8}>created by {post.username}</Col>
                            <Col span={8} offset={8}>{ moment(post.created_at).format('LLL')}</Col>
                        </Row>
                    </Col>
                    <Col span={1}>
                        <Button type="danger" size="small" icon="delete"
                                onClick={() => deletePost(post)}>
                        </Button>
                        <Button type="primary" size="small" icon="edit"
                                onClick={() => console.log(post)}>
                        </Button>
                    </Col>
                </Row>
                <Row type="flex" align="bottom" gutter={8}>
                    <Col span={23}>
                        <PostEditForm post={post}/>
                    </Col>
                </Row>
            </div>

        );
    // }
    // return (
    //     <Row type="flex" align="bottom" gutter={8}>
    //         <Col span={23}>
    //             <Row>
    //                 <PostContent>{post.content}</PostContent>
    //                 <Col span={8}>created by {post.username}</Col>
    //                 <Col span={8} offset={8}>{ moment(post.created_at).format('LLL')}</Col>
    //             </Row>
    //         </Col>
    //         <Col span={1}>
    //
    //         </Col>
    //     </Row>
    // );
};
const mapStateToProps = (state) => {
    return {
        username : state.auth.username
    }
};

export default connect(mapStateToProps, actions)(Post);