import React from "react";
import { Form, Icon, Input, Button} from 'antd';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../store/twitter/twitter-actions';

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.userLogin(values);
            }
        });
    };

    render() {
        const { err, username } = this.props;
        const { getFieldDecorator } = this.props.form;
        if (username) {
            return  <Redirect to="/feed" />
        }
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
                    { err ? `${err}` : ''}
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
const mapStateToProps = ({err, username}) => {
    return {err, username}
};
export default connect(mapStateToProps,actions)(Form.create({ name: 'login' })(LoginForm));
