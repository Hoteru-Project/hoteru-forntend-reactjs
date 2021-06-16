import React, {Component} from "react";
import Layout from "./hocs/Layout/Layout";
import {Route, Switch} from 'react-router-dom';
import Authentication from "./components/Authentication/Authentication";
import {authenticationService} from "./services/authentication.service";

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

    componentDidMount() {
        authenticationService.currentUser.subscribe(user => {
            const expireDate = authenticationService.isAuthenticated() && user ? new Date(user?.expireDate) : null;
            this.setState({currentUser: {...user, expireDate: expireDate}, authenticated: authenticationService.isAuthenticated()})
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
                        <Route path="/auth" component={Authentication}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
