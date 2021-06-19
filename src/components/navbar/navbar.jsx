import React from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Nav from "../UI/NavbarDrawer/NavbarDrawer";
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import {Link} from "react-router-dom";
import NavbarMenu from "../UI/NavbarMenu/NavbarMenu";
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import i18n from "i18next";
import {authenticationService} from "../../services/authentication.service";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,

    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        display: "block"
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
    }
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);


    const menus = [
        {
            name: i18n.language?.toUpperCase(),
            icon: <PublicTwoToneIcon/>,
            items: [
                {
                    name: "Arabic",
                    onClick: () => {
                        i18n.changeLanguage('ar')
                    },
                    country_code: "EG"
                },
                {
                    name: "English",
                    onClick: () => {
                        i18n.changeLanguage('en')
                    },
                    country_code: "US"
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
        },
        {
            name: authenticationService.currentUserValue?.name?.trim()?.split(" ")[0],
            icon: <AccountCircle/>,
            items: [
                ...(authenticationService.isAuthenticated() ?
                        [
                            {name: "Profile", link: "/user"},
                            {name: "Logout", onClick: () => authenticationService.logout()}
                        ] : [
                            {name: "Login", link: "/auth/login"},
                            {name: "Register", link: "/auth/register"}
                        ]
                )
            ]
        }
    ];

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} component={Link} to="/auth/register">Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.bgg} color="transparent">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>Hoteru</Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{"aria-label": "search"}}
                        />
                    </div>

                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        {menus.map(menu => <NavbarMenu menu={menu}/>)}
                    </div>
                    <div className={classes.sectionMobile}>
                        <Nav/>
                    </div>
                </Toolbar>

            </AppBar>
            {renderMenu}

        </div>
    );
}