import React from 'react';
import { Link } from "react-router-dom";
import { MenuItem } from '@material-ui/core';


const navbarMenuItem = (props) => 
    <MenuItem onClick={(event) => {props.item.onClick(event);props.handleClick(event)}} component={Link} to={props.item.link}>
            {props.item.name}
    </MenuItem>


export default navbarMenuItem;