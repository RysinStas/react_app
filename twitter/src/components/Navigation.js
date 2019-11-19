import React from "react";
import { Menu, Icon } from 'antd';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

const { SubMenu } = Menu;

class Navigation extends React.Component {
    // state = {
    //     current: 'home',
    // };
    //
    // handleClick = e => {
    //     console.log('click ', e);
    //     this.setState({
    //         current: e.key,
    //     });
    // };

    render() {
        const {location, username} = this.props;
        return (
            <Menu onClick={this.handleClick} selectedKeys={[location.pathname]} mode="horizontal">
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon type="home" />
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="/feed">
                    <Link to="/feed">
                        <Icon type="mail" />
                        Feed
                    </Link>
                </Menu.Item>
                <Menu.Item key="/setting" disabled>
                    <Icon type="setting" />
                    Settings
                </Menu.Item>
                <Menu.Item key="/secret" >
                    <Link to="/secret">
                        <Icon type="setting" />
                        Secret
                    </Link>
                </Menu.Item>
                { !username ?
                    <Menu.Item key="/login">
                        <Link to="/login">
                            <Icon type="login" />
                            Log In
                        </Link>
                    </Menu.Item>
                    :
                    <Menu.Item key="/logout">
                        <Link to="/logout">
                            <Icon type="logout" />
                            Log Out
                        </Link>
                    </Menu.Item>
                }
            </Menu>
        );
    }
}

const mapStateToProps = ({username}) => {
    return {username}
};

export default connect(mapStateToProps)(withRouter(Navigation));