import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Nav from "../UI/NavbarDrawer/NavbarDrawer";
import LanguageIcon from '@material-ui/icons/Language';
import PublicTwoToneIcon from '@material-ui/icons/PublicTwoTone';
import { Link } from "react-router-dom";
import NavbarMenu from "../UI/NavbarMenu/NavbarMenu";
import MonetizationOnTwoToneIcon from '@material-ui/icons/MonetizationOnTwoTone';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
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
  bgg:{
      backgroundColor:'white',
      color:'#0058CA'
  }
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const menus = [
    {
        name:'EN' ,  
        icon:<PublicTwoToneIcon />,
        items: [
            {
                name: "Arabic",
                onClick: ()=>{
                    console.log('hello');
                } 
            }
        ]
    },
    {
        
        icon:<MonetizationOnTwoToneIcon />,
        items: [
            {
                name: "English",
                onClick: ()=>{
                    console.log('hello2');
                }  
            }
        ]
    },
  ];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/auth/register">Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.bgg} color="transparent" >
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Hoteru
          </Typography>
          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
              {menus.map(menu => <NavbarMenu menu={menu} />)}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            ></IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <Nav />
          </div>
        </Toolbar>
        
      </AppBar>
      {renderMenu}
      
    </div>
  );
}





















// import React, { Component } from 'react';
// import classes from "./navbar.css";
// import TextField from "@material-ui/core/TextField";
// import Nav from './nav'
// class Navbar extends Component {
//     state = { 
//         isDesktop: false
//      }
//      componentDidMount() {
//         this.updatePredicate();
//         window.addEventListener("resize", this.updatePredicate);
//       }
    
//       updatePredicate = ()=> {
//         this.setState({ isDesktop: window.innerWidth > 900 });
//       }
    


//     render() { 
//         return ( 
//             <>
//                 <nav className="navbar  shadow">
//                     <div className="container-fluid collapse navbar-collapse"  id="navbarSupportedContent">
//                         <div className="d-flex w-100  justify-content-between">
//                             <div className="">
//                                <ul className="d-flex">
//                                     <li className=" pt-3">
//                                         <a className="navbar-brand" href="#">Hoteru</a>
//                                     </li>
//                                </ul>
//                             </div>
                            
//                         </div>
//                         {!this.state.isDesktop? <Nav /> : }
//                     </div>
//                 </nav>
//             </>
//          );
//     }
// }
 
// export default Navbar;