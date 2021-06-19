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


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`
    };
}


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        height: "100%",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        [theme.breakpoints.down("md")]: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            borderRight: 0,
        }
    }
}));

const User = () => {
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
                orientation={matches?"horizontal":"vertical"}
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className={classes.tabs}
                indicatorColor="primary"
            >
                <Tab label="Profile" icon={<AssignmentIndIcon />} {...a11yProps(0)} />
                <Tab label="Verify Account" icon={<VerifiedUserIcon />} {...a11yProps(1)} />
                <Tab label="Search History" icon={<HistoryIcon />} {...a11yProps(2)} />
                <Tab label="Email Subscription" icon={<SubscriptionsIcon />} {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}><Profile /></TabPanel>
            <TabPanel value={value} index={1}><ResendVerification/></TabPanel>
            <TabPanel value={value} index={2}>Item Three</TabPanel>
            <TabPanel value={value} index={3}>Item Four</TabPanel>
        </div>
    );
}

export default User;
