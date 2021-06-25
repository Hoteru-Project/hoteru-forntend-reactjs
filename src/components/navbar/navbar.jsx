import React from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Nav from "../UI/NavbarDrawer/NavbarDrawer";
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import {Link, withRouter} from "react-router-dom";
import NavbarMenu from "../UI/NavbarMenu/NavbarMenu";
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";
import {authenticationService} from "../../services/authentication.service";
import {Avatar} from "@material-ui/core";
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Router from "../../Router";


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        display: "block",
        textDecoration: "none",
        color: '#0058CA',
        "&:hover": {
            textDecoration: "none",
            color: '#0058CA'
        }
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        display: "none",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
            display: "block"
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch"
        }
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    bgg: {
        backgroundColor: 'white',
        color: '#0058CA'
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    blue: {
        backgroundColor: "#0058CA",

    }
}));

const PrimarySearchAppBar = (props) => {
    const classes = useStyles();

    const { t } = useTranslation();
    const getReducedName = () => {
        const nameArray = authenticationService.currentUserValue?.name?.trim()?.split(" ");
        return nameArray && (nameArray.length<=1?nameArray[0][0].toUpperCase():nameArray.reduce((accumulator, currentValue) => accumulator[0] + currentValue[0].toUpperCase()));
    }

    const menus = [
        {
            name: authenticationService.currentUserValue?.name,
            icon: <Avatar className={classes.blue}>{getReducedName()}</Avatar>,
            items: [
                ...(authenticationService.isAuthenticated() ?
                        [
                            {name: `${t('profile')}`, link: Router("user")},
                            {name: `${t('logout')}`, onClick: () => authenticationService.logout()}
                        ] : [
                            {name: `${t('login')}`, link: Router("authentication.login")},
                            {name: `${t('register')}`, link: Router("authentication.register")}
                        ]
                )
            ]
        },
        {
            name: i18n.language?.toUpperCase(),
            icon: <PublicTwoToneIcon/>,
            items: [
                {
                    name: "English",
                    onClick: async () => {
                        const href = window.location.pathname + window.location.search;
                        await i18n.changeLanguage('en')
                        console.log(href)
                        props.history.push(href)
                    },
                    country_code: "US"
                },
                {
                    name: "Arabic",
                    onClick: async () => {
                        const href = window.location.pathname + window.location.search;
                        await i18n.changeLanguage('ar')
                        props.history.push(href)

                    },
                    country_code: "EG"
                }
            ]
        },
        {
            icon: <MonetizationOnTwoToneIcon/>,
            items: [
                {
                    name: "English",
                    onClick: () => {
                        console.log('hello2');
                    }
                }
            ]
        }

    ];


    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.bgg} color="transparent">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap component={Link} to={Router("homepage")}>Hoteru</Typography>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        {menus.map(menu => <NavbarMenu menu={menu}/>)}
                    </div>
                    <div className={classes.sectionMobile}>
                        <Nav menus={menus}/>
                    </div>
                </Toolbar>

            </AppBar>
        </div>
    );
}

export default  withRouter(PrimarySearchAppBar)
