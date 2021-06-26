import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Navbar from '../../navbar/navbar';
import {Link} from 'react-router-dom';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const Nav = (props) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const navItems = [
        {
            displayName: "Register",
            to: "/auth/register",
            icon: <MailIcon/>
        },
        {
            displayName: "Login",
            to: "/auth/login",
            icon: <MailIcon/>
        }
    ]

    const list = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {props.menus.map((items, itemsIndex) => (
                 <>

                     {items.items.map((item, itemsIndex) => (
                         <ListItem onClick={(event) => {!!item.onClick && item.onClick(event)}} key={itemsIndex} component={Link} to={item.link}>
                             <ListItemText primary={item.name}/>
                         </ListItem>
                     ))}
                    <Divider/>
                 </>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon onClick={toggleDrawer('right', true)}/>
                </IconButton>
                <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                    {list('right')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
export default Nav
