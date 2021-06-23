import MotionDiv from "../../../hocs/MotionDiv/MotionDiv";
import classes from "./Profile.css";
import {Button, Checkbox, FormControlLabel, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {authenticationService} from "../../../services/authentication.service";
import {CancelOutlined, VerifiedUser} from "@material-ui/icons";
import userClasses from "../User.css";
import {useTranslation} from "react-i18next";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import resolve from "resolve";
import {yupResolver} from "@hookform/resolvers/yup";
import instance from "../../../axios-backend";
import {useState} from "react";
import LoadingBackdrop from "../../UI/LoadingBackdrop/LoadingBackdrop";

const useStyles = makeStyles((theme) => ({
    ProfileHeader: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "noWrap",
        }
    }
}));


const schema = yup.object().shape({
    name: yup.string().required().min(3).test('alphabets', 'Name must only contain alphabets', value => /^[A-Za-z][A-Za-z ]+$/.test(value))
});


const Profile = () => {
    const {t} = useTranslation();

    document.title = `${process.env.REACT_APP_NAME} | ${t("profile")} `

    const customClasses = useStyles();
    const {register, formState: {errors}, handleSubmit} = useForm({resolver: yupResolver(schema)})

    const [isLoading, setIsLoading] = useState(false);

    const isVerified = authenticationService.isEmailVerified();

    const handleFormSubmit = async (data) => {
        setIsLoading(true);
        await instance.patch("users/user", data);
        await authenticationService.me()
        setIsLoading(false);
    }

    return (
        <MotionDiv className={classes.Container}>
            <LoadingBackdrop open={isLoading}/>
            <Paper elevation={3} className={classes.PaperContainer}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className={customClasses.ProfileHeader}>
                        <h1 className={userClasses.Header}>{t("profile_settings")}</h1>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    icon={<CancelOutlined fontSize="small" color="secondary"/>}
                                    checkedIcon={<VerifiedUser fontSize="small" color="primary"/>}
                                    checked={isVerified}
                                />
                            }
                            label={<Typography
                                color={isVerified ? "primary" : "secondary"}>{isVerified ? t("verified") : t("not_verified")}</Typography>}
                            labelPlacement="bottom"
                        />
                    </div>
                    <TextField
                        className={classes.TextField} label={t("name")}
                        variant="outlined"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        defaultValue={authenticationService.currentUserValue.name}/>
                    <TextField className={classes.TextField} label={t("email")} variant="outlined"
                               defaultValue={authenticationService.currentUserValue.email} disabled={true}/>
                    <Button variant="contained" color="primary" type="submit">{t("save_account_settings")}</Button>
                </form>
            </Paper>
        </MotionDiv>
    );
}

export default Profile;
