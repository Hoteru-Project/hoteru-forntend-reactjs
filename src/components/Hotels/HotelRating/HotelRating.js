import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const labels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Excellent',
    5: 'Outstanding',
};

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
    },
});

export default function HotelRating(props) {
    const [value] = React.useState(props.stars);
    const [hover] = React.useState(-1);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Rating
                name="hover-feedback"
                value={value} readOnly
            />
            {value !== null && <Box ml={0}>{labels[hover !== -1 ? hover : value]}</Box>}
        </div>
    );
}
