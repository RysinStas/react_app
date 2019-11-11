import React from 'react';
// import styled from "styled-components";
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import Schema from 'async-validator';
Schema.warning = function(){};

// const Form = styled.form`
//     padding: .25rem .75rem;
// `;
const { TextArea } = Input;
// const Textarea = styled.textarea`
//     overflow: auto;
//     resize: vertical;
//     width: 100%;
//     padding: .375rem .75rem;
//     max-height: 20rem;
//     min-height: 3rem;
//     font-size: 1rem;
//     line-height: 1.5;
//     border: 1px solid #ced4da;
//     border-radius: .25rem;
// `;

// const ButtonWrapper = styled.div`
//     padding: .75rem;
//     text-align: center;
// `;

// const Button = styled.button`
//     display: inline-block;
//     padding: .375rem .75rem;
//     color: #6c757d;
//     background-color: transparent;
//     border: 1px solid #6c757d;
//     border-radius: .25rem;
//     text-transform: capitalize;
//     font-weight: 400;
//     vertical-align: middle;
//     cursor: pointer;
//     transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
//     :hover {
//         color: #ffffff;
//         text-decoration: none;
//         background-color: #6c757d;
//         border-color: #6c757d;
//     }
// `;

class PostAddForm extends React.Component {
    state = {
        content: ''
    };
    onTextChange = (e) => {
        this.setState({
            content: e.target.value
        });
    };
    onKeyDown = (e) => {
        if(e.ctrlKey && e.keyCode === 13) {
            this.onFormSubmit(e);
        }
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        // this.props.form.validateFields();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAddPost(this.state.content);
            }
        });
        if (this.state.content) {
            // this.props.onAddPost(this.state.content);
            // this.setState({
            //     content: ''
            // });
            this.props.form.setFieldsValue({
                content: ''
            });
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                  onSubmit={this.onFormSubmit}>
                <Form.Item>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: 'Please input post content', whitespace: true }],
                    })(
                        <TextArea
                            autoSize = { {minRows: 5, maxRows: 10} }
                            placeholder="Put your text here"
                            onChange={this.onTextChange}
                            onKeyDown={this.onKeyDown}
                            autoFocus
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