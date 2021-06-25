import React, {useState} from 'react';
import classes from './Marker.css';

const Marker = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const {color, name, id} = props;
    const markerClasses = [classes.pin, classes.bounce].join(" ")
    const setClose = () => {
        setIsClicked(true)
    }
    return (
        <>
            <div
                className={markerClasses}
                style={{backgroundColor: color, cursor: 'pointer', position: "relative"}}
                title={name}
            />
            {!isClicked &&
            <div className="bg-white rounded-3 p-2"
                 style={{position: "absolute", top: "-80px", left: "-25px", width: "180px"}}>
                <div className="d-flex flex-row justify-content-around">
                    <div>
                        <p className="m-0">{props.hotel.name}</p>
                        <p className="m-0">{props.hotel.hotelPricing.startingAt.formatted} / night</p>
                    </div>
                    <div>
                        <button type="button" className="btn-close" aria-label="Close"
                            onClick={setClose}
                        />
                    </div>
                </div>
            </div>
            }
            <div className={classes.pulse}/>
        </>
    );
};

export default Marker;
