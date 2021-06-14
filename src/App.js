import React, {Component} from "react";
import Layout from "./hocs/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import Authentication from "./components/Authentication/Authentication";
import {authenticationService} from "./services/authentication.service";
import GuestRoute from "./containers/Routes/GuestRoute/GuestRoute";

class App extends Component {
    state = {
        currentUser: {name: null, email: null, token: null, email_verified_at: null, expireDate: null},
        authenticated: false,
        firstTimeAuthentication: true
    }

    startScheduledRepeatedTasks = () => {
        const me = () => {
            if (this.state.authenticated) {
                authenticationService.me();
                setTimeout(me, 1000*60*10);
            }
        };
        const refresh = () => {
            if (this.state.authenticated) {
                authenticationService.refresh();
                setTimeout(refresh, (this.state.currentUser.expireDate - new Date()) - (1000 * 60 * 15))
            }
        }
        me();
        refresh();
    }

    isAuthenticated = user => new Date(user?.expireDate).getTime() > new Date().getTime();

    componentDidMount() {
        authenticationService.currentUser.subscribe(user => {
            const isAuthenticated = this.isAuthenticated(user);

            const expireDate = isAuthenticated && user ? new Date(user?.expireDate) : null;

            this.setState({currentUser: {...user, expireDate: expireDate}, authenticated: isAuthenticated})
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.authenticated && this.state.firstTimeAuthentication) {
            this.startScheduledRepeatedTasks();
            this.setState({firstTimeAuthentication: false})
        }
    }

    logout = () => {
        authenticationService.logout()
        this.setState({authenticated: false, firstTimeAuthentication: true})
    }

    render() {


        return (
            <div>
                <Layout logout={this.logout} currentUser={this.state.currentUser}>
                    <Switch>
                        <GuestRoute authenticated={this.state.authenticated} path="/login" exact component={Authentication}/>
                        <GuestRoute authenticated={this.state.authenticated} path="/register" exact component={Authentication}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
