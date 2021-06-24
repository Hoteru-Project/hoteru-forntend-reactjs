import Profile from "./Profile/Profile";
import React from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import HistoryIcon from '@material-ui/icons/History';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import TabPanel from "../UI/TabPanel/TabPanel";
import {useMediaQuery} from "@material-ui/core";
import ResendVerification from "../Authentication/ResendVerification/ResendVerification";
import {authenticationService} from "../../services/authentication.service";
import {useTranslation} from "react-i18next";
import RecentVisits from "../RecentVisits/RecentVisits"

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`
    };
}


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    },
    tabs: {
        flex: 1,
        borderRight: `1px solid ${theme.palette.divider}`,
        [theme.breakpoints.down("sm")]: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            borderRight: 0,
        }
    },
    bodyContainer: {
        flex: 4,
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            display: "block"
        }
    }
}));

const User = () => {
    const {t} = useTranslation();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <div className={classes.root}>
            <Tabs
                orientation={matches ? "horizontal" : "vertical"}
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className={classes.tabs}
                indicatorColor="primary"
            >
                <Tab label={t("profile")} icon={<AssignmentIndIcon/>} {...a11yProps(0)} />
                {!authenticationService.isEmailVerified() && <Tab label={t("verify_account")} icon={<VerifiedUserIcon/>} {...a11yProps(1)} />}
                <Tab label={t("search_history")} icon={<HistoryIcon/>} {...a11yProps(2)} />
            </Tabs>
            <div className={classes.bodyContainer}>
                <TabPanel value={value} index={0}><Profile/></TabPanel>
                {!authenticationService.isEmailVerified() && <TabPanel value={value} index={1}><ResendVerification/></TabPanel>}
                <TabPanel value={value} index={2}><RecentVisits /></TabPanel>
            </div>
        </div>
    );
}

export default User;
