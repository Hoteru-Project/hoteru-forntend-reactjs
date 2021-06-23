import React, {useState} from "react";
import classes from "./ForgotPassword.css";
import {Alert} from "@material-ui/lab";
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import instance from "../../../axios-backend";
import authenticationClasses from "../Authentication.css";
import MotionDiv from "../../../hocs/MotionDiv/MotionDiv";
import {useTranslation} from "react-i18next";
import LoadingBackdrop from "../../UI/LoadingBackdrop/LoadingBackdrop";

const schema = yup.object().shape({email: yup.string().required().email()});

const ForgotPassword = () => {
    const {t} = useTranslation();

    document.title = `${process.env.REACT_APP_NAME} | ${t("forgot_password")}`

    const {register, formState: {errors}, handleSubmit} = useForm({resolver: yupResolver(schema)});
    const [values, setValues] = useState({
        loading: false,
        sent: false,
        error: ""
    });

    const handleSubmitForgetPassword = (data) => {
        setValues({...values, loading: true});
        instance.post("auth/forgot-password", data)
            .then(() => setValues({...values, loading: false, sent: true}))
            .catch(() => setValues({...values, error: "Email not found."}))
    }

    return (
        <MotionDiv className={authenticationClasses.Container}>
            <LoadingBackdrop open={values.loading}/>
            {!values.loading && !values.sent &&
            <form className={classes.Container} autoComplete="off" onSubmit={handleSubmit(handleSubmitForgetPassword)}>
                <h1>{t("forgot_password")}</h1>
                {!!values.error && <Alert severity="error">{values.error}</Alert>}
                <TextField
                    className={classes.FormControl}
                    id="email" label="Email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <Button variant="contained" color="primary" type="submit">{t("request_reset_password")}</Button>
            </form>
            }
            {values.sent &&
            <>
                <div className={classes.Container}>
                    <h1>{t("email_successfully_sent")}</h1>
                    <Button variant="contained" color="primary" component={Link} to="/">{t("homepage")}</Button>
                </div>
            </>
            }
        </MotionDiv>
    )
}
export default ForgotPassword;
