import React from "react";
import classes from "./Register.css"
import {
    Button,
    FormControl,
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
import {AlertTitle} from "@material-ui/lab";
import {Link, Redirect} from "react-router-dom";
import authenticationClasses from "../Authentication.css";
import MotionDiv from "../../../hocs/MotionDiv/MotionDiv";
import Router from "../../../Router";
import Backdrop from "../../UI/LoadingBackdrop/LoadingBackdrop";
import {useTranslation} from "react-i18next";

const schema = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    passwordConfirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
});


const Register = () => {
    const {t} = useTranslation();
    document.title = `${process.env.REACT_APP_NAME} | ${t("register")} `

    const {register, formState: {errors}, handleSubmit} = useForm({resolver: yupResolver(schema)});

    const [values, setValues] = React.useState({showPassword: false});
    const [isLoading, setIsLoading] = React.useState(false);
    const [responseErrors, setResponseErrors] = React.useState([]);
    const [validRegistration, setValidRegistration] = React.useState(false);

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleSubmission = async (data) => {
        setIsLoading(true);
        const response = await authenticationService.register(data);
        if (response?.status !== 201) {
            setResponseErrors(Object.values(response?.data?.errors??{}));
        } else {
            setValidRegistration(true);
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
            <Backdrop open={isLoading}/>
            {validRegistration && <Redirect to={Router("authentication.login")}/>}
            <form className={classes.Container} onSubmit={handleSubmit(handleSubmission)}>
                <h1>{process.env.REACT_APP_NAME} {t("register")}</h1>
                {!!responseErrors.length &&
                <Alert severity="error">
                    <AlertTitle>{t("errors")}</AlertTitle>
                    <ul>
                        {responseErrors.map((item, key) => <li key={key}>{item}</li>)}
                    </ul>
                </Alert>
                }

                <FormControl className={classes.FormControl}>
                    <TextField
                        label={t("name")}
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </FormControl>

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
                        endAdornment={endAdornment}
                    />
                    {errors?.password && <FormHelperText variant="standard">{errors.password?.message}</FormHelperText>}
                </FormControl>
                <FormControl className={classes.FormControl} error={!!errors.passwordConfirmation}>
                    <InputLabel htmlFor="standard-adornment-password">{t("confirm_password")}</InputLabel>
                    <Input
                        id="standard-adornment-password-confirmation"
                        type={values.showPassword ? 'text' : 'password'}
                        {...register("passwordConfirmation")}
                        endAdornment={endAdornment}
                    />
                    {errors?.passwordConfirmation &&
                    <FormHelperText variant="standard">{errors.passwordConfirmation?.message}</FormHelperText>}
                </FormControl>
                <Button variant="contained" color="primary" type="submit">{t("register")}</Button>

                <div className={classes.ExtraFields}>
                    <span>{t("already_a_member")}</span>
                    <Button variant="contained" color="secondary" component={Link}
                            to={Router("authentication.login")}>{t("login")}</Button>
                </div>
            </form>
        </MotionDiv>
    );
}

export default Register;
