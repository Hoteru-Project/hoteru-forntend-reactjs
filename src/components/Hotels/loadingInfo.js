import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Animations() {
    return (
        <div>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton />
            <Skeleton animation="wave" />
        </div>
    );
}
