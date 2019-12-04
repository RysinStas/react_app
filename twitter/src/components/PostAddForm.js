import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

import * as actions from '../store/twitter/twitter-actions';
import {connect} from "react-redux";

import Schema from 'async-validator';

Schema.warning = function(){};

const { TextArea } = Input;

const PostAddForm = (props) => {
    const onPressEnter = (e) => {
        if (e.ctrlKey || e.metaKey) {
            const value = props.form.getFieldValue('content');
            props.form.setFieldsValue({
                content: value + '\n',
            });
        } else {
            onFormSubmit(e);
        }
    };
    const onFormSubmit = (e) => {
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                props.addPost(values.content, props.username);
                props.form.resetFields();
            }
        });
    };

    const { getFieldDecorator } = props.form;

    return (
        <Form
            onSubmit={onFormSubmit}>
            <Form.Item>
                {getFieldDecorator('content', {
                    rules: [{ required: true, message: 'Please input post content', whitespace: true, min: 1 }],
                    initialValue: ''
                })(
                    <TextArea
                        autoSize = { {minRows: 5, maxRows: 10} }
                        placeholder="Put your text here"
                        autoFocus
                        onPressEnter = {onPressEnter}
                    >
                    </TextArea>
                )}
            </Form.Item>
            <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">Add Post</Button>
            </Form.Item>
        </Form>
    );
};

const mapStateToProps = (state) => {
    return {
        current_page: state.feed.data.current_page,
        username: state.auth.data.username
    }
};

export default connect(mapStateToProps, actions)(Form.create({ name: 'coordinated' })(PostAddForm));
