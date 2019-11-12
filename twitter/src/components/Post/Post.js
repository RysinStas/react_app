import React from 'react';
import moment from "moment";
import styled from "styled-components";
import {Button, Col, Row} from 'antd';
import 'antd/dist/antd.css';

const PostContent = styled.div`
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    font-size: small;
    overflow: auto;
    max-height: 500px;
    white-space: pre-line;   
`;

class Post extends React.Component {

    render() {
        const {content, user, created_at, onDelete} = this.props;
        return (
            <Row type="flex" align="bottom" gutter={8}>
                <Col span={23}>
                    <Row>
                        <PostContent>{content}</PostContent>
                        <Col span={8}>create by {user}</Col>
                        <Col span={8} offset={8}>{ moment(created_at).format('LLL')}</Col>
                    </Row>
                </Col>
                <Col span={1}>
                    <Button type="danger" size="small" icon="delete"
                            onClick={onDelete}>
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default Post;