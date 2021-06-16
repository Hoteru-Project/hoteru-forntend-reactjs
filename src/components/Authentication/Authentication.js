import classes from "./Authentication.css";
import {Route, Switch} from "react-router-dom";
import GuestRoute from "../../containers/Routes/GuestRoute/GuestRoute";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Verify from "./Verify/Verify";
import ResendVerification from "./ResendVerification/ResendVerification";
import ForgetPassword from "./ForgetPassword/ForgetPassword";

const authentication = (props) => {
    return (
        <div className={classes.Container}>
            <Switch>
                <GuestRoute authenticated={props.authenticated} path="/auth/login" exact component={Login}/>
                <GuestRoute authenticated={props.authenticated} path="/auth/register" exact component={Register}/>
                <GuestRoute authenticated={props.authenticated} path="/auth/forget-password" exact component={ForgetPassword}/>
                <Route path="/auth/resend-verification-email" exact component={ResendVerification}/>
                <Route path="/auth/verify" excat component={Verify}/>
            </Switch>
        </div>
    )
}

export default authentication;
