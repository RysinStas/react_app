import React from "react";
import {Menu, Icon} from 'antd';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

class NavigationMenu extends React.Component {

    render() {
        const {location, account} = this.props;
        return (
            <Menu onClick={this.handleClick} selectedKeys={[location.pathname]} mode="horizontal">
                <Menu.Item key="/">
                    <Link to="/">
                        <Icon type="home"/>
                        Home
                    </Link>
                </Menu.Item>
                {account.name &&
                <Menu.Item key="/feed">
                    <Link to="/feed">
                        <Icon type="mail"/>
                        Feed
                    </Link>
                </Menu.Item>
                }
                {account.name &&
                <Menu.Item key="/notifications/mentions">
                    <Link to="/notifications/mentions">
                        <Icon type="bell"/>
                        Notifications
                    </Link>
                </Menu.Item>
                }
                {!account.name ?
                    <Menu.Item key="/login" style={{float: 'right'}}>
                        <Link to="/login">
                            <Icon type="login"/>
                            Log In
                        </Link>
                    </Menu.Item>
                    :
                    <Menu.Item key="/logout" style={{float: 'right'}}>
                        <Link to="/logout">
                            <Icon type="logout"/>
                            Log Out
                        </Link>
                    </Menu.Item>
                }
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.auth.account
    }
};

export default connect(mapStateToProps)(withRouter(NavigationMenu));