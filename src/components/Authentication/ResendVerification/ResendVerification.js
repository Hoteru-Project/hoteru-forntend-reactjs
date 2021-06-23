import React, {useState} from "react";
import classes from "./ResendVerification.css";
import {Alert} from "@material-ui/lab";
import {Button, Paper} from "@material-ui/core";
import {Link} from "react-router-dom";
import {authenticationService} from "../../../services/authentication.service";
import authenticationClasses from "../Authentication.css";
import MotionDiv from "../../../hocs/MotionDiv/MotionDiv";
import Router from "../../../Router";
import {useTranslation} from "react-i18next";
import LoadingBackdrop from "../../UI/LoadingBackdrop/LoadingBackdrop";

const ResendVerification = () => {
    const {t} = useTranslation();

    document.title = `${process.env.REACT_APP_NAME} | ${t("resend_email_verification")}`;

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
            setValues({...values, error: t("something_went_wrong_please_try_again_later")+"."});
        }
    }

    return (
        <MotionDiv className={authenticationClasses.Container}>
            <LoadingBackdrop open={values.loading}/>
            {!values.loading && !values.sent &&
            <Paper elevation={3} className={classes.Container}>
                <h1>{t("resend_email_verification")}</h1>
                {!!values.error && <Alert severity="error">{values.error}</Alert>}
                <Button variant="contained" color="primary" onClick={handleSubmitVerification}>{t("resend")}</Button>
            </Paper>
            }
            {values.sent &&
            <>
                <div className={classes.Container}>
                    <h1>{t("email_successfully_sent")}</h1>
                    <Button variant="contained" color="primary" component={Link} to={Router("homepage")}>{t("homepage")}</Button>
                </div>
            </>
            }
        </MotionDiv>
    )
}
export default ResendVerification;
