import classes from "./Verify.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {Alert} from "@material-ui/lab";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const Verify = (props) => {
    const [verified, setVerified] = useState(null);

    useEffect(() => {
        const url = new URLSearchParams(props.location.search).get("url");
        axios.get(url)
            .then(response => setVerified(true))
            .catch(response => setVerified(false))
    });

    return (
        <div className={classes.Container}>
            {verified === null && "Verifying..."}
            {verified === false &&
            <Alert severity="error">We Couldn't verify your account please try again or resend another verification
                request.</Alert>}
            {verified &&
            <>
                <Alert severity="success">Verified Successfully, Please login to your account.</Alert>
                <Button variant="contained" color="primary" component={Link} to="/auth/login">Login</Button>
            </>
            }
        </div>
    );
}

export default Verify;
