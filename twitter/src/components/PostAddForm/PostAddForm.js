import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

import Schema from 'async-validator';

Schema.warning = function(){};

const { TextArea } = Input;

class PostAddForm extends React.Component {

    onPressEnter = (e) => {
        if (e.ctrlKey) {
            const value = this.props.form.getFieldValue('content');
            this.props.form.setFieldsValue({
                content: value + '\r\n',
            });
        } else {
            this.onFormSubmit(e);
        }
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onAddPost(values.content);
                this.props.form.resetFields();
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form
                  onSubmit={this.onFormSubmit}>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input post content', whitespace: true, min: 1 }],
                        initialValue: ''
                    })(
                        <TextArea
                            autoSize = { {minRows: 5, maxRows: 10} }
                            placeholder="Put your text here"
                            autoFocus
                            onPressEnter = {this.onPressEnter}
                            >
                        </TextArea>
                    )}
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">Add Post</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrapperPostAddForm = Form.create({ name: 'coordinated' })(PostAddForm);

export default WrapperPostAddForm;