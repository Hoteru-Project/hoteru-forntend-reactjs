import React, {Component} from "react";
import Layout from "./hocs/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import Test from "./components/test";
import Test2 from "./components/test2";
import GoogleMap from "./components/GoogleMap/Map";
import ListHotels from "./components/Hotels/ListHotels/ListHotels"
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Authentication from "./components/Authentication/Authentication";
import {authenticationService} from "./services/authentication.service";
import User from "./components/User/User";
import ProtectedRoute from "./containers/Routes/ProtectedRoute/ProtectedRoute";
import {AnimatePresence} from "framer-motion";
import MainSec from "./components/mainsec/main";
import Router from "./Router";
import instance from "./axios-backend";
import i18n from "i18next";
import RTL from "./hocs/RTL/RTL";


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

            // Sending authorization header with all requests if found
            instance.defaults.headers.common["Authorization"] = authenticationService.isAuthenticated() ? `Bearer ${user?.token}` : null;

            if (authenticationService.isAuthenticated() && this.state.firstTimeAuthentication) {

                // Invalidate current condition to make sure executed only once
                await this.setState({firstTimeAuthentication: false})

                // In Case remember me requesting refresh token
                JSON.parse(localStorage.getItem("rememberMe")) && await authenticationService.refresh();

                // Start Scheduled Tasks
                await this.startScheduledRepeatedTasks();


            } else if (!authenticationService.isAuthenticated()) {
                this.setState({authenticated: false, firstTimeAuthentication: true})
            }

            // Setting User and authorization state
            this.setState({
                currentUser: {...user, expireDate: new Date(user?.expireDate)},
                authenticated: authenticationService.isAuthenticated()
            })

        })
    }

    logout = () => {
        authenticationService.logout()
        this.setState({authenticated: false, firstTimeAuthentication: true})
    }

    render() {
        document.body.dir = i18n.dir();
        document.documentElement.lang =i18n.language;
        const theme = createMuiTheme({direction: i18n.dir()});
        return (
            <RTL>
                <ThemeProvider theme={theme}>
                    <div dir={i18n.dir()}>
                        <Layout logout={this.logout} currentUser={this.state.currentUser}>
                            <AnimatePresence>
                                <Switch>
                                    <Route path={Router("authentication")} component={Authentication}/>
                                    <ProtectedRoute path={Router("user")} exact component={User}/>
                                    <Route path="/map" exact component={GoogleMap}/>
                                    <Route path={Router("homepage")} exact component={MainSec}/>
                                    <Route path="/hotels" exact component={ListHotels}/>

                                </Switch>
                            </AnimatePresence>
                        </Layout>
                    </div>
                </ThemeProvider>
            </RTL>

        );
    }
}

export default withTranslation()(App);
