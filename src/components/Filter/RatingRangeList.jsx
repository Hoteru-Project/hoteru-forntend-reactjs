import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: '50%',
  },
}));


const styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2
    },
    customBadge: {
      backgroundColor: "red",
      color: "red"
    }
  });
  
function RatingRangeList(props) {
  const classes = useStyles(styles);
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;
  
  const handleClick = ()=>{}

  
  return (
    <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
        <h6><strong>Hotels Ratings</strong></h6>

        <ListItem button
        onClick={()=>{props.handleRatingListClicked("excellent")}}>
    
        <div style={{justifyContent:"space-between"}}>
          <span class="badge badge-pill badge-success">
            8.5
          </span>
          <span> Excellent</span>
        </div>  
        </ListItem>

        <ListItem button
        onClick={()=>{props.handleRatingListClicked("very-good")}}>

          <div style={{justifyContent:"space-between"}}>
          <span className="badge badge-pill badge-success" style={{backgroundColor:"#59ad30" }}>8.0 </span>
          <span> Very Good</span>  
          </div>
        </ListItem>
        
        <ListItem button
        onClick={()=>{props.handleRatingListClicked("good")}}>
          <div style={{justifyContent:"space-between"}}>
          <span className="badge badge-pill badge-success" style={{backgroundColor:"#93c91f" }}>7.5 </span>
          <span> Good</span>  
          </div>
        </ListItem>

        <ListItem button
        onClick={()=>{props.handleRatingListClicked("fair")}}>
          <div style={{justifyContent:"space-between"}}>
          <span className="badge badge-pill badge-success" style={{backgroundColor:"#e84f00" }}>7.0 </span>
          <span> Fair</span>  
          </div>
        </ListItem>

        <ListItem button
        onClick={()=>{props.handleRatingListClicked("okay")}}>
          <div style={{justifyContent:"space-between"}}>
          <span className="badge badge-pill badge-success" style={{backgroundColor:"#d3620a" }}>6.5 </span>
          <span> Okay</span>  
          </div>
        </ListItem>
     


        </List>
    </div>
  );
}

export default  withStyles(styles) (RatingRangeList);






