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

const Navigation = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route path="/login" component={LoginPage}/>
                <Route path="/registration" component={SignUpPage}/>
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

export default Navigation