import React, {Component} from "react";
import Layout from "./hocs/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import Test from "./components/test";
import Test2 from "./components/test2";


import Authentication from "./components/Authentication/Authentication";
import {authenticationService} from "./services/authentication.service";
import User from "./components/User/User";
import ProtectedRoute from "./containers/Routes/ProtectedRoute/ProtectedRoute";
import {AnimatePresence} from "framer-motion";

class App extends Component {
    state = {
        currentUser: {name: null, email: null, token: null, email_verified_at: null, expireDate: null},
        authenticated: false,
        firstTimeAuthentication: true
    }

    startScheduledRepeatedTasks = () => {
        const me = () => {
            if (authenticationService.isAuthenticated()) {
                authenticationService.me();
                setTimeout(me, 1000 * 60 * 1.5);
            }

        };
        me();
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(async user => {
            const expireDate = authenticationService.isAuthenticated() && user ? new Date(user?.expireDate) : null;
           if (authenticationService.isAuthenticated() && this.state.firstTimeAuthentication) {
                JSON.parse(localStorage.getItem("rememberMe")) && await authenticationService.refresh();
                this.setState({firstTimeAuthentication: false})
                this.startScheduledRepeatedTasks();
            }
           else {
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
                            <Route path="/auth" component={Authentication}/>
                            <ProtectedRoute path="/user" exact component={User}/>
                            <Route path="/" exact component={Test}/>
                            <Route path="/t" exact component={Test2}/>
                        </Switch>
                    </AnimatePresence>
                </Layout>
            </div>
        );
    }
}

export default withTranslation()(App);
