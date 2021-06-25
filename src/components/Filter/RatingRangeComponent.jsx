import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RatingRangeList from './RatingRangeList';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function RatingRange(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {t} = useTranslation();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button aria-describedby={id} variant="outlined" color="primary" onClick={handleClick}>
                {t("guest_rating")}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>
                    <RatingRangeList handleRatingListClicked={props.getClassRatingToMenu}/>
                </Typography>
            </Popover>
        </>
    );
}

