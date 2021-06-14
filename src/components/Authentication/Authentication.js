import classes from "./Authentication.css";
import {Route, Switch} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";

const authentication = (props) => {
    return (
        <div className={classes.Container}>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </div>
    )
}

export default authentication;
