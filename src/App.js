import React, {Component} from "react";
import Layout from "./hocs/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import FilterDisplayComponent from "./components/Filter/FilterDisplayComponent";
import {withTranslation} from 'react-i18next';

import GoogleMap from "./components/GoogleMap/Map";
import ListHotels from "./components/Hotels/ListHotels/ListHotels"


import Authentication from "./components/Authentication/Authentication";
import {authenticationService} from "./services/authentication.service";
import User from "./components/User/User";
import ProtectedRoute from "./containers/Routes/ProtectedRoute/ProtectedRoute";
import {AnimatePresence} from "framer-motion";
import MainSec from "./components/mainsec/main";
import Router from "./Router";
import instance from "./axios-backend";

class App extends Component {
    state = {
        currentUser: {name: null, email: null, token: null, email_verified_at: null, expireDate: null},
        authenticated: false,
        firstTimeAuthentication: true
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    startScheduledRepeatedTasks = async () => {
        const me = () => {
            if (authenticationService.isAuthenticated()) {
                authenticationService.me();
                setTimeout(me, 1000 * 60 * 1.5);
            }

        };
        await this.delay(200);
        me();
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(async user => {
            const expireDate = authenticationService.isAuthenticated() && user ? new Date(user?.expireDate) : null;
            instance.defaults.headers.common["Authorization"] = authenticationService.isAuthenticated() ? `Bearer ${user?.token}` : null;
            if (authenticationService.isAuthenticated() && this.state.firstTimeAuthentication) {
                await this.setState({firstTimeAuthentication: false})
                JSON.parse(localStorage.getItem("rememberMe")) && await authenticationService.refresh();
                await this.startScheduledRepeatedTasks();
            } else if (!authenticationService.isAuthenticated()) {
                this.setState({authenticated: false, firstTimeAuthentication: true})
            }
            this.setState({
                currentUser: {...user, expireDate: expireDate},
                authenticated: authenticationService.isAuthenticated()
            })
        })
    }

    logout = () => {
        authenticationService.logout()
        this.setState({authenticated: false, firstTimeAuthentication: true})
    }

    render() {
        // const {t} = this.props;
        return (
            <div>
                <Layout logout={this.logout} currentUser={this.state.currentUser}>
                    <AnimatePresence>
                        <Switch>
                            <Route path={Router("authentication")} component={Authentication}/>
                            <ProtectedRoute path={Router("user")} exact component={User}/>
                            <Route path="/map" exact component={GoogleMap}/>
                            <Route path={Router("homepage")} exact component={MainSec}/>
                            <Route path="/hotels" exact component={ListHotels}/>
                            <Route path='/filters' exact component={FilterDisplayComponent}/>
                        </Switch>
                    </AnimatePresence>
                </Layout>
            </div>
        );
    }
}

export default withTranslation()(App);
