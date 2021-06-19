import React, {useState} from "react";
import classes from "./ResetPassword.css"
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {AlertTitle} from "@material-ui/lab";
import {Link, Redirect} from "react-router-dom";
import {authenticationService} from "../../../services/authentication.service";
import authenticationClasses from "../Authentication.css";
import MotionDiv from "../../../hocs/MotionDiv/MotionDiv";

const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    password_confirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const ResetPassword = (props) => {
    document.title = `${process.env.REACT_APP_NAME} | Reset Password`

    const {register, formState: {errors}, handleSubmit} = useForm({resolver: yupResolver(schema)});

    const [values, setValues] = useState({
        loading: false,
        send: false,
        successful: false,
        showPassword: false
    });

    const [responseErrors, setResponseErrors] = useState([]);

    const token = new URLSearchParams(props.location.search).get("token");


    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleSubmission = async (data) => {
        setValues({...values, loading: true})
        const response = await authenticationService.resetPassword(data, token);
        if (response.status === 200) {
            setValues({...values, send: true, successful: true})
        } else {
            setValues({...values, send: true, successful: false});
            setResponseErrors(Object.values(response.data?.errors));
        }
        setValues({...values, loading: false});
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
            {!token && <Redirect to="/"/>}
            {values.send && values.successful &&
            <>
                <div className={classes.Container}>
                    <h1>Password successfully updated</h1>
                    <Button variant="contained" color="primary" component={Link} to="/auth/login">Login</Button>
                </div>
            </>
            }
            <form className={classes.Container} onSubmit={handleSubmit(handleSubmission)}>
                {values.loading ? <div>Loading...</div> : <>

                    <h1>{process.env.REACT_APP_NAME} Reset Password</h1>
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
                        {errors?.password &&
                        <FormHelperText variant="standard">{errors.password?.message}</FormHelperText>}
                    </FormControl>
                    <FormControl className={classes.FormControl} error={!!errors.password_confirmation}>
                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                        <Input
                            id="standard-adornment-password-confirmation"
                            type={values.showPassword ? 'text' : 'password'}
                            {...register("password_confirmation")}
                            endAdornment={endAdornment}
                        />
                        {errors?.password_confirmation &&
                        <FormHelperText variant="standard">{errors.password_confirmation?.message}</FormHelperText>}
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">Reset</Button>
                </>}

            </form>
        </MotionDiv>
    );
}

export default ResetPassword;
