import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, account, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            account.name ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

const mapStateToProps = (state) =>{
    return {
        account: state.auth.account
    }
};
export default connect(mapStateToProps)(PrivateRoute);