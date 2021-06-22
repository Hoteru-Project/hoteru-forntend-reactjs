import React, {useState} from "react";
import classes from "./ForgotPassword.css";
import {Alert} from "@material-ui/lab";
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import instance from "../../../axios-backend";

const schema = yup.object().shape({email: yup.string().required().email()});

const ForgotPassword = () => {
    document.title = `${process.env.REACT_APP_NAME} | Forgot Password`

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
        <>
            {values.loading && "Sending..."}
            {!values.loading && !values.sent &&
            <form className={classes.Container} autoComplete="off" onSubmit={handleSubmit(handleSubmitForgetPassword)}>
                <h1>Forgot Password</h1>
                {!!values.error && <Alert severity="error">{values.error}</Alert>}
                <TextField
                    className={classes.FormControl}
                    id="email" label="Email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <Button variant="contained" color="primary" type="submit">Forget Password</Button>
            </form>
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
export default ForgotPassword;
