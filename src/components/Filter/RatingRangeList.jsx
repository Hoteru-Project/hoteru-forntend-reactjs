import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';

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
  
function RatingRangeList() {
  const classes = useStyles(styles);
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;
  
  const handleClick = ()=>{}

  return (
    <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
        <h6><strong>Hotels Ratings</strong></h6>
        <ListItem button>
            <Chip
            avatar={
                <Badge
                overlap="circle" badgeContent="8.5"
                classes={{ badge: classes.customBadge }}
                className={classes.margin}
                anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        >
                </Badge>}
            label="Excellent"
            variant="outlined"
            onClick={handleClick}
            />
        </ListItem>

        
        <ListItem button>
            <Chip
            avatar={
                <Badge color="primary" overlap="circle" badgeContent="8.0"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        >
                </Badge>}
            label="Very good"
            variant="outlined"
            onClick={handleClick}
            />
        </ListItem>
     
        <ListItem button>
            <Chip
            avatar={
                <Badge color="primary" overlap="circle" badgeContent="7.5"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        >
                </Badge>}
            label="Good"
            variant="outlined"
            onClick={handleClick}
            />
        </ListItem>

        <ListItem button>
            <Chip
            avatar={
                <Badge color="primary" overlap="circle" badgeContent="7.0"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        >
                </Badge>}
            label="Fair"
            variant="outlined"
            onClick={handleClick}
            />
        </ListItem>

        <ListItem button>
            <Chip
            avatar={
                <Badge color="primary" overlap="circle" badgeContent="6.5"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        >
                </Badge>}
            label="Okay"
            variant="outlined"
            color="success"
            onClick={handleClick}
            />
        </ListItem>

        </List>
    </div>
  );
}

export default  withStyles(styles) (RatingRangeList);
// export default function RatingRangeList() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <List component="nav" aria-label="main mailbox folders">
        


//         <ListItem button>
//         <StyledBadge badgeContent={8.5} color="green">

//         </StyledBadge>
//         </ListItem>

//         <ListItem button>
//           <ListItemIcon>
//             <DraftsIcon />
//           </ListItemIcon>
//           <ListItemText primary="Drafts" />
//         </ListItem>

//       </List>
//     </div>
//   );
// }






