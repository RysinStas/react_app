import React from "react";
import { Form, Icon, Input, Button} from 'antd';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../../store/auth/auth-actions';

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.loginAndFetchUser(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form" style={ {'maxWidth': '300px'}}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your login!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Login"
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

export default connect(null,actions)(Form.create({ name: 'login' })(LoginForm));

