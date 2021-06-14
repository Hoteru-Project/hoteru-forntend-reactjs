import classes from "./Authentication.css";
import {Route, Switch} from "react-router-dom";
import Login from "./Login/Login";

const authentication = (props) => {
    return (
        <div className={classes.Container}>
            <Switch>
                <Route path="/login" component={Login}/>
            </Switch>
        </div>
    )
}

export default authentication;
