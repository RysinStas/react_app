import React from 'react';

import AppHeader from './AppHeader';
import { Route, Switch , BrowserRouter as Router} from "react-router-dom"

import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import FeedPage from "./pages/FeedPage"
import SignUpPage from "./pages/SignUpPage"
import WelcomePage from "./pages/WelcomePage";
import PrivateRoute from "./PrivateRoute";

const Navigation = () => {
    return (
        <Router>
            <AppHeader />
            <Switch>
                <Route path="/" component={WelcomePage} exact/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/registration" component={SignUpPage}/>
                <PrivateRoute path="/logout" component={LogoutPage}/>
                <PrivateRoute path="/feed" component={FeedPage}/>
            </Switch>
        </Router>
    );
};

export default Navigation
