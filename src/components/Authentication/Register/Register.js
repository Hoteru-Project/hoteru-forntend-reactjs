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

const schema = yup.object().shape({
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    passwordConfirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const Register = () => {
    document.title = `${process.env.REACT_APP_NAME} | Register `

    const {register, formState: {errors}, handleSubmit} = useForm({resolver: yupResolver(schema)});

    const [values, setValues] = React.useState({showPassword: false});
    const [responseErrors, setResponseErrors] = React.useState([]);
    const [validRegistration, setValidRegistration] = React.useState(false);

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleSubmission = async (data) => {
        const resp = await authenticationService.register(data);
        if (!resp.response?.status === 201) {
            setResponseErrors(Object.values(resp.response?.data?.errors));
        } else {
            setValidRegistration(true);
        }
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
        <>
            {validRegistration && <Redirect to="/login" />}
            <form className={classes.Container} onSubmit={handleSubmit(handleSubmission)}>
                <h1>{process.env.REACT_APP_NAME} Register</h1>
                {!!responseErrors.length &&
                <Alert severity="error">
                    <AlertTitle>Errors</AlertTitle>
                    <ul>
                        {responseErrors.map((item, key) => <li key={key}>{item}</li>)}
                    </ul>
                </Alert>
                }

                <FormControl className={classes.FormControl}>
                    <TextField
                        label="Name"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </FormControl>

                <FormControl className={classes.FormControl}>
                    <TextField
                        label="Email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </FormControl>
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
                <Button variant="contained" color="primary" type="submit">Register</Button>

                <div className={classes.ExtraFields}>
                    <span>Already a member?</span>
                    <Button variant="contained" color="secondary" component={Link} to={"/auth/login"}>Login</Button>
                </div>
            </form>
        </>
    );
}

export default Register;
