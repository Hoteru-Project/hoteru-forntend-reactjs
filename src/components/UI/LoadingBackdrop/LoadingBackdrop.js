import React from "react";
import {Backdrop, CircularProgress} from "@material-ui/core";
import classes from "./LoadingBackdrop.css"

const LoadingBackdrop = (props) =>
    <Backdrop className={classes.Container}  open={props.open}>
        <CircularProgress {...props}/>
    </Backdrop>

export default LoadingBackdrop;
