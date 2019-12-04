import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, username, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            username ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

const mapStateToProps = (state) =>{
    return {
        username: state.auth.data.username
    }
};
export default connect(mapStateToProps)(PrivateRoute);