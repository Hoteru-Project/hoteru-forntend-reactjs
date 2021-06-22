import classes from "./Verify.css";
import {useEffect, useState} from "react";
import {Alert} from "@material-ui/lab";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {authenticationService} from "../../../services/authentication.service";
import authenticationClasses from "../Authentication.css";
import MotionDiv from "../../../hocs/MotionDiv/MotionDiv";
import Router from "../../../Router";
import {useTranslation} from "react-i18next";
import LoadingBackdrop from "../../UI/LoadingBackdrop/LoadingBackdrop";

const Verify = (props) => {
    const {t} = useTranslation();

    document.title = `${process.env.REACT_APP_NAME} | ${t("verify")}`

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
                <LoadingBackdrop open={verified=== null} />
                {verified === false &&
                <Alert severity="error">{t("we_could_not_verify_email")}</Alert>}
                {verified &&
                <>
                    <Alert severity="success">{t("email_verified_successfully")}</Alert>
                    {!!authenticationService.isAuthenticated() ?
                        <Button variant="contained" color="primary" component={Link} to={Router("homepage")}>{t("homepage")}</Button> :
                        <Button variant="contained" color="primary" component={Link} to={Router("authentication.login")}>{t("login")}</Button>
                    }
                </>
                }
            </div>
        </MotionDiv>
    );
}

export default Verify;
