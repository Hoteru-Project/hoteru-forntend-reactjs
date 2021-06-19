import React, {useState} from "react";
import classes from "./ResendVerification.css";
import {Alert} from "@material-ui/lab";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {authenticationService} from "../../../services/authentication.service";


const ResendVerification = () => {
    document.title = `${process.env.REACT_APP_NAME} | Resend Verification Request `;


    const [values, setValues] = useState({
        loading: false,
        sent: false,
        error: ""
    });

    const handleSubmitVerification = async () => {
        setValues({...values, loading: true});
        const response = await authenticationService.resendVerification();
        if (response.status === 200) {
            setValues({...values, loading: false, sent: true});
        } else {
            setValues({...values, error: "Something Went wrong please try again later."});
        }
    }

    return (
        <>
            {values.loading && "Sending..."}
            {!values.loading && !values.sent &&
            <div className={classes.Container}>
                <h1>Resend Email Verification</h1>
                {!!values.error && <Alert severity="error">{values.error}</Alert>}
                <Button variant="contained" color="primary" onClick={handleSubmitVerification}>Resend</Button>
            </div>
            }
            {values.sent &&
            <>
                <div className={classes.Container}>
                    <h1>Email successfully sent</h1>
                    <Button variant="contained" color="primary" component={Link} to="/">Homepage</Button>
                </div>
            </>
            }
        </>
    )
}
export default ResendVerification;
