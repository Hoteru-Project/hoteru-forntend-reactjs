import React from "react";
import classes from "./Login.css";
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
import {Link} from "react-router-dom";

const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
})

const Login = () => {
    document.title = `${process.env.REACT_APP_NAME} | Login `

    const {register, formState: {errors}, handleSubmit} = useForm({resolver: yupResolver(schema)});
    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const [error, setError] = React.useState(false);

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleSubmission = async (data) => {
        const resp = await authenticationService.login(data);
        if (resp) {
            setError(resp.response?.data?.error);
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
            <form className={classes.Container} onSubmit={handleSubmit(handleSubmission)}>
                <h1>{process.env.REACT_APP_NAME} Login</h1>
                {error &&
                <Alert severity="error">Invalid Email or Password</Alert>
                }
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
                        value={values.password}
                        endAdornment={endAdornment}
                    />
                    {errors?.password && <FormHelperText variant="standard">{errors.password?.message}</FormHelperText>}
                </FormControl>
                <Button variant="contained" color="primary" type="submit">Login</Button>

                <div>
                    <Link to="/auth/forgot-password">Forgot Password?</Link>
                </div>

                <div className={classes.ExtraFields}>
                    <span>Don't have account?</span>
                    <Button variant="contained" color="secondary" component={Link} to={"/auth/register"}>Register</Button>
                </div>
            </form>
        </>
    );
}

export default Login;
