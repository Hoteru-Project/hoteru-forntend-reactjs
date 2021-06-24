import React from 'react';
import classes from './Marker.css';

const Marker = (props) => {
    const { color, name, id } = props;
    const markerClasses = [classes.pin, classes.bounce].join(" ")
    return (
        <div>
            <div
                className={markerClasses}
                style={{ backgroundColor: color, cursor: 'pointer' }}
                title={name}
            />
            <div className={classes.pulse} />
        </div>
    );
};

export default Marker;