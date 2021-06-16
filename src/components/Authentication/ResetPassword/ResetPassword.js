import React from "react";
import classes from "./ResetPassword.css"
import {Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel,} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {AlertTitle} from "@material-ui/lab";
import {Redirect} from "react-router-dom";
import instance from "../../../axios-backend";

const schema = yup.object().shape({
    password: yup.string().required().min(8),
    passwordConfirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const ResetPassword = (props) => {
    const {register, formState: {errors}, handleSubmit} = useForm({resolver: yupResolver(schema)});

    const [values, setValues] = React.useState({showPassword: false});
    const [responseErrors, setResponseErrors] = React.useState([]);
    const [validRegistration, setValidRegistration] = React.useState(false);

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleSubmission = async (data) => {
        instance()
    };

    document.title = `${process.env.REACT_APP_NAME} | Reset Password `

    const endAdornment = (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
            >
                {values.showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
        </InputAdornment>
    )

    return (
        <>
            {validRegistration && <Redirect to="/login" />}
            <form className={classes.Container} onSubmit={handleSubmit(handleSubmission)}>
                <h1>{process.env.REACT_APP_NAME} Reset Password</h1>
                {!!responseErrors.length &&
                <Alert severity="error">
                    <AlertTitle>Errors</AlertTitle>
                    <ul>
                        {responseErrors.map((item, key) => <li key={key}>{item}</li>)}
                    </ul>
                </Alert>
                }

                <FormControl className={classes.FormControl} error={!!errors.password}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        {...register("password")}
                        endAdornment={endAdornment}
                    />
                    {errors?.password && <FormHelperText variant="standard">{errors.password?.message}</FormHelperText>}
                </FormControl>
                <FormControl className={classes.FormControl} error={!!errors.passwordConfirmation}>
                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                    <Input
                        id="standard-adornment-password-confirmation"
                        type={values.showPassword ? 'text' : 'password'}
                        {...register("passwordConfirmation")}
                        endAdornment={endAdornment}
                    />
                    {errors?.passwordConfirmation &&
                    <FormHelperText variant="standard">{errors.passwordConfirmation?.message}</FormHelperText>}
                </FormControl>
                <Button variant="contained" color="primary" type="submit">Login</Button>
            </form>
        </>
    );
}

export default ResetPassword;
