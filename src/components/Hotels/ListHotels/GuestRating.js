import React from 'react';

const GuestRating = (props)=> {

    const getRating = (rating) => {
        if (rating >= 8.5){
            return <span className="badge badge-pill badge-success" style={{backgroundColor: "#417f24"}}>{props.rating}</span>
        }
        if (rating >= 8){
            return <span className="badge badge-pill badge-success" style={{backgroundColor: "#59ad30"}}>{props.rating}</span>
        }
        if (rating >= 7.5){
            return <span className="badge badge-pill badge-success" style={{backgroundColor: "#93c91f"}}>{props.rating}</span>
        }
        if (rating >= 7){
            return <span className="badge badge-pill badge-success" style={{backgroundColor: "#e84f00"}}>{props.rating}</span>
        }
        if (rating <= 6.5){
            return <span className="badge badge-pill badge-success" style={{backgroundColor: "#d3620a"}}>{props.rating}</span>
        }
    }

    return (
        <>
            {
                getRating(props.rating)
            }
        </>
    );
}

export default GuestRating;






