import classes from "./Authentication.css";
import {Redirect, Route, Switch} from "react-router-dom";
import GuestRoute from "../../containers/Routes/GuestRoute/GuestRoute";
import ProtectedRoute from "../../containers/Routes/ProtectedRoute/ProtectedRoute";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Verify from "./Verify/Verify";
import ResendVerification from "./ResendVerification/ResendVerification";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ResetPassword from "./ResetPassword/ResetPassword";

const authentication = () => {
    return (
        <div className={classes.Container}>
            <Switch>
                <GuestRoute path="/auth/login" exact component={Login}/>
                <GuestRoute path="/auth/register" exact component={Register}/>
                <GuestRoute path="/auth/forget-password" exact component={ForgotPassword}/>
                <GuestRoute path="/auth/reset-password" exact component={ResetPassword}/>
                <ProtectedRoute path="/auth/resend-verification-email" exact component={ResendVerification}/>
                <Route path="/auth/verify" excat component={Verify}/>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default authentication;
