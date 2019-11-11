import React from 'react';
import moment from "moment";
import styled from "styled-components";
// import { FaTrashAlt } from "react-icons/all";
import {Button, Col, Row} from 'antd';
import 'antd/dist/antd.css';
// const PostWrapper = styled.div`
//     width: 95%;
//     display: inline-block;
//     text-align: left;
// `;
//
const PostContent = styled.div`
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    font-size: small;
    overflow: auto;
    max-height: 500px;
    white-space: pre-line;   
`;
//
// const PostContent = styled.div`
//     overflow: auto;
//     max-height: 500px;
//     line-height: 1.5rem;
// `;
//
// const PostInfoUser = styled.div`
//     width: 50%;
//     display: inline-block;
//     text-align: left;
// `;
//
// const PostInfoDate = styled.div`
//     width: 50%;
//     display: inline-block;
//     text-align: right;
// `;
//
// const PostButtonsBlock = styled.div`
//     width: 5%;
//     overflow: auto;
//     display: inline-block;
//     text-align: right;
// `;

// const Button = styled.button`
//     display: inline-block;
//     padding: .15rem
//     color: #dc3545;
//     background-color: transparent;
//     border: 1px solid #dc3545;
//     border-radius: .25rem;
//     text-transform: capitalize;
//     font-weight: 400;
//     vertical-align: middle;
//     cursor: pointer;
//     transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
//     :hover {
//         color: #ffffff;
//         text-decoration: none;
//         background-color: #dc3545;
//         // border-color: #6c757d;
//     }
// `;

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