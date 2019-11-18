import React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from "react-router-dom";
import axios from "axios";

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.sendData(values);
            }
        });
    };
    sendData = (data) => {
        const querystring = require('querystring');
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        axios.post('http://dev.com/api/login/',
            querystring.stringify(data),config
        )
            .then(r => console.log(r))
            .catch(e => console.log(e));
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" style={ {'maxWidth': '300px'}}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{'width' : '100%'}}>
                        Sign in
                    </Button>
                    Or <Link to="/registration">sign up now!</Link>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create({ name: 'login' })(LoginForm);

