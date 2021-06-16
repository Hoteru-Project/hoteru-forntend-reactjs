import {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {authenticationService} from "../../../services/authentication.service";

class GuestRoute extends Component {
    render() {
        const {component: Component, ...props} = this.props;
        return (
            <Route {...props} render={props => (
                !authenticationService.isAuthenticated() ?
                    <Component {...props} /> :
                    <Redirect to="/"/>
            )}
            />
        );
    }
}

export default GuestRoute;
