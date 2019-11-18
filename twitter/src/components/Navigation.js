import React from "react";
import { Menu, Icon } from 'antd';
import {Link} from "react-router-dom";

const { SubMenu } = Menu;

class Navigation extends React.Component {
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="home">
                    <Link to="/">
                        <Icon type="home" />
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="feed">
                    <Link to="/feed">
                        <Icon type="mail" />
                        Feed
                    </Link>
                </Menu.Item>
                <Menu.Item key="setting" disabled>
                    <Icon type="setting" />
                    Settings
                </Menu.Item>
                <Menu.Item key="login">
                    <Link to="/login">
                        <Icon type="login" />
                        Sign In
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}

export default Navigation;