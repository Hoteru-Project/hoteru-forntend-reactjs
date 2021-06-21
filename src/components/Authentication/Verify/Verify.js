import classes from "./Verify.css";
import {useEffect, useState} from "react";
import {Alert} from "@material-ui/lab";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {authenticationService} from "../../../services/authentication.service";
import authenticationClasses from "../Authentication.css";
import MotionDiv from "../../../hocs/MotionDiv/MotionDiv";
import Router from "../../../Router";

const Verify = (props) => {
    const [verified, setVerified] = useState(null);

    useEffect(() => {
        (async () => {
            const url = new URLSearchParams(props.location.search).get("url");
            if (url) {
                const response = await authenticationService.verify(url);
                setVerified(response.status === 200)
            } else {
                setVerified(false);
            }
        })();

    }, [props.location.search]);

    return (
        <MotionDiv className={authenticationClasses.Container}>
            <div className={classes.Container}>
                {verified === null && "Verifying..."}
                {verified === false &&
                <Alert severity="error">We Couldn't verify your account please try again or resend another verification
                    request.</Alert>}
                {verified &&
                <>
                    <Alert severity="success">Verified Successfully, Please login to your account.</Alert>
                    {!!authenticationService.isAuthenticated() ?
                        <Button variant="contained" color="primary" component={Link} to={Router("homepage")}>Homepage</Button> :
                        <Button variant="contained" color="primary" component={Link} to={Router("authentication.login")}>Login</Button>
                    }
                </>
                }
            </div>
        </MotionDiv>
    );
}

export default Verify;
