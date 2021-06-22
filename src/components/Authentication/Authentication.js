import {Redirect, Route, Switch} from "react-router-dom";
import GuestRoute from "../../containers/Routes/GuestRoute/GuestRoute";
import ProtectedRoute from "../../containers/Routes/ProtectedRoute/ProtectedRoute";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Verify from "./Verify/Verify";
import ResendVerification from "./ResendVerification/ResendVerification";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ResetPassword from "./ResetPassword/ResetPassword";
import Router from "../../Router";

const authentication = () => {
    return (
        <Switch>
            <GuestRoute path={Router("authentication.login")} exact component={Login}/>
            <GuestRoute path={Router("authentication.register")} exact component={Register}/>
            <GuestRoute path={Router("authentication.forgotPassword")} exact component={ForgotPassword}/>
            <GuestRoute path={Router("authentication.resetPassword")} exact component={ResetPassword}/>
            <ProtectedRoute path={Router("authentication.resendEmailVerification")} exact component={ResendVerification}/>
            <Route path={Router("authentication.verifyEmail")} excat component={Verify}/>
            <Redirect to={Router("homepage")}/>
        </Switch>
    )
}

export default authentication;
