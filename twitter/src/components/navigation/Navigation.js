import React from 'react';
import { Route, Switch , BrowserRouter as Router} from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import FeedPage from "../pages/FeedPage"
import SignUpPage from "../pages/SignUpPage"
import WelcomePage from "../pages/WelcomePage";
import PrivateRoute from "./PrivateRoute";
import HashtagPage from "../pages/HashtagPage";
import MentionsPage from "../pages/MentionsPage";
import NotificationsPage from "../pages/NotificationsPage";
import Page404 from "../pages/Page404";
import Errors from "../Errors";
import {connect} from "react-redux";

const Navigation = (props) => {
    const {errors} = props.errors;
    return (
        <Router>
            <Errors errors={errors}/>
            <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route path="/login" component={LoginPage}/>
                <Route path="/registration" component={SignUpPage}/>
                <Route path="/page404" component={Page404}/>
                <PrivateRoute path="/logout" component={LogoutPage}/>
                <PrivateRoute path="/feed" component={FeedPage} />
                <PrivateRoute path="/notifications/mentions" component={NotificationsPage} />
                <PrivateRoute path="/hashtag/:name" component={HashtagPage} />
                <PrivateRoute path="/mentions/:name" component={MentionsPage} />
                <Route path="*" component={Page404}/>
            </Switch>
        </Router>
    );
};

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
};

export default connect(mapStateToProps)(Navigation)
