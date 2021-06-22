import React from "react";
import classes from "./Login.css";
import authenticationClasses from "../Authentication.css";
import {
    Button, Checkbox,
    FormControl, FormControlLabel,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {authenticationService} from "../../../services/authentication.service";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Link} from "react-router-dom";
import MotionDiv from "../../../hocs/MotionDiv/MotionDiv";
import Router from "../../../Router";
import LoadingBackdrop from "../../UI/LoadingBackdrop/LoadingBackdrop";
import {useTranslation} from "react-i18next";


const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
})

const Login = () => {
    const {t} = useTranslation();

    document.title = `${process.env.REACT_APP_NAME} | ${t("login")} `

    const [isLoading, setIsLoading] = React.useState(false);
    const {register, formState: {errors}, handleSubmit} = useForm({resolver: yupResolver(schema)});
    const [values, setValues] = React.useState({showPassword: false, rememberMe: false});

    const [error, setError] = React.useState(false);

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleRememberMe = () => {
        setValues({...values, rememberMe: !values.rememberMe});
    };

    const handleSubmission = async (data) => {
        setIsLoading(true);
        localStorage.setItem("rememberMe", values.rememberMe);
        const resp = await authenticationService.login(data);
        if (resp) {
            setError(resp.response?.data?.error);
        }
        setIsLoading(false);
    };

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
        <MotionDiv className={authenticationClasses.Container}>
            <LoadingBackdrop open={isLoading}/>
            <form className={classes.Container} onSubmit={handleSubmit(handleSubmission)}>
                <h1>{process.env.REACT_APP_NAME} {t("login")}</h1>
                {error &&
                <Alert severity="error">{t("invalid_email_or_password")}</Alert>
                }
                <FormControl className={classes.FormControl}>

                    <TextField
                        label={t("email")}
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </FormControl>

                <FormControl className={classes.FormControl} error={!!errors.password}>
                    <InputLabel htmlFor="standard-adornment-password">{t("password")}</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        {...register("password")}
                        value={values.password}
                        endAdornment={endAdornment}
                    />
                    {errors?.password &&
                    <FormHelperText variant="standard">{errors.password?.message}</FormHelperText>}
                </FormControl>

                <FormControlLabel
                    control={
                        <Checkbox color="primary" onChange={handleRememberMe} checked={values.rememberMe}/>
                    }
                    label={t("remember_me")}
                />
                <Button variant="contained" color="primary" type="submit">{t("login")}</Button>

                <div>
                    <Link to={Router("authentication.forgotPassword")}>{t("forgot_password")}</Link>
                </div>

                <div className={classes.ExtraFields}>
                    <span>{t("dont_have_account")}</span>
                    <Button variant="contained" color="secondary" component={Link}
                            to={Router("authentication.register")}>{t("register")}</Button>
                </div>
            </form>
        </MotionDiv>
    );
}

export default Login;
