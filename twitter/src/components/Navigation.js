import React from 'react';

import AppHeader from './AppHeader';
import { Route, BrowserRouter as Router} from "react-router-dom"

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
            <Route path="/" component={WelcomePage} exact/>
            <PrivateRoute path="/feed" component={FeedPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/registration" component={SignUpPage}/>
            <PrivateRoute path="/logout" component={LogoutPage}/>
        </Router>
    );
};

export default Navigation
