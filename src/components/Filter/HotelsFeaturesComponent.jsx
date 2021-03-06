import React, {useEffect, useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import PoolIcon from '@material-ui/icons/Pool';
import WifiIcon from '@material-ui/icons/Wifi';
import CancelIcon from '@material-ui/icons/Cancel';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import PetsIcon from '@material-ui/icons/Pets';
import PaymentIcon from '@material-ui/icons/Payment';
import SpaIcon from '@material-ui/icons/Spa';
import AccessibleIcon from '@material-ui/icons/Accessible';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import HotTubIcon from '@material-ui/icons/HotTub';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import RefreshIcon from '@material-ui/icons/Refresh';


export default function HotelsFeatures(props) {

    const [filterParams, setFilterParams] = React.useState([
        {name: "Pool", avatarIcon: <PoolIcon/>, checked: false},
        {name: "Wifi", avatarIcon: <WifiIcon/>, checked: false},
        {name: "Free cancellation", avatarIcon: <CancelIcon/>, check: false},
        {name: "Air conditioning", avatarIcon: <AcUnitIcon/>, checked: false},
        {name: "Pet friendly", avatarIcon: <PetsIcon/>, checked: false},
        {name: "Pay at the property", avatarIcon: <PaymentIcon/>, checked: false},
        {name: "Spa", avatarIcon: <SpaIcon/>, checked: false},
        {name: "Wheelchair accessible", avatarIcon: <AccessibleIcon/>, checked: false},
        {name: "Free breakfast", avatarIcon: <FreeBreakfastIcon/>, checked: false},
        {name: "Beach", avatarIcon: <BeachAccessIcon/>, checked: false},
        {name: "Car park", avatarIcon: <LocalParkingIcon/>, checked: false},
        {name: "Restaurant", avatarIcon: <RestaurantMenuIcon/>, checked: false},
        {name: "Family friendly", avatarIcon: <ChildFriendlyIcon/>, checked: false},
        {name: "Whirlpool/Hot tub", avatarIcon: <HotTubIcon/>, checked: false},
        {name: "Gym", avatarIcon: <FitnessCenterIcon/>, checked: false},

    ])

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            const urlSearchFilterParams = new URLSearchParams(window.location.search).get("filter");
            if (urlSearchFilterParams) {
                const filters = urlSearchFilterParams.split("-");
                const modifiedFilterParams = filterParams.map(filter => {
                    filter.checked = filters.includes(filter.name);
                    return filter;
                })
                setFilterParams(modifiedFilterParams);
                const newFilterNames = []
                modifiedFilterParams.forEach(filter => {
                    if (filter.checked) newFilterNames.push(filter.name)
                });
                props.setCheckedFilters(newFilterNames);
                setIsInitialized(true);

            }
        }

    }, [filterParams, isInitialized, props]);


    const handleToggle = (value) => () => {
        const currentIndex = props.checkedFilters.indexOf(value);
        const newChecked = [...props.checkedFilters];


        let newFilterParams;
        if (currentIndex === -1) {
            newChecked.push(value);
            newFilterParams = filterParams.map(item => {
                if (item.name === value) {
                    item.checked = true
                }
                return item;
            })
        } else {
            newChecked.splice(currentIndex, 1);
            newFilterParams = filterParams.map(item => {
                if (item.name === value) {
                    item.checked = false
                }
                return item;
            })
        }
        props.setCheckedFilters(newChecked);
        setFilterParams(newFilterParams);
    };

    const handleReset = () => {
        const newFilterParams = filterParams.map(element => {
            element.checked = false;
            return element;
        });

        props.setCheckedFilters([]);
        setFilterParams(newFilterParams);
    }

    const secondColumnStart = Math.floor(filterParams.length / 2);


    return (
        <div className="container">
            <h6 className="m-1"><strong>Hotel Class</strong></h6>
            <div>
                <Button
                    component="fieldset"
                    variant="outlined"
                    size="small"
                    className="m-1"
                    onClick={() => {
                        props.getStarsRatingToDisplay("one")
                    }}
                >
                    <Rating name="read-only" value={1} max={1} readOnly size="small"/>
                </Button>

                <Button
                    component="fieldset"
                    variant="outlined"
                    size="small"
                    className="m-1"
                    onClick={() => {
                        props.getStarsRatingToDisplay("two")
                    }}
                >
                    <Rating name="read-only" value={2} max={2} readOnly size="small"/>
                </Button>


                <Button
                    component="fieldset"
                    variant="outlined"
                    size="small"
                    className="m-1"
                    onClick={() => {
                        props.getStarsRatingToDisplay("three")
                    }}
                >
          <span>
            <Rating
                name="read-only" value={1} max={1} readOnly
                size="small"
                className="d-flex justify-content-center"/>
            <Rating
                name="read-only"
                value={2} max={2}
                readOnly size="small"
                className="d-flex justify-content-around"/>
          </span>
                </Button>

                <Button
                    component="fieldset"
                    variant="outlined"
                    size="small"
                    className="m-1"
                    onClick={() => {
                        props.getStarsRatingToDisplay("four")
                    }}
                >
            <span>
              <Rating name="read-only" value={2} max={2} readOnly size="small"
                      className="d-flex justify-content-around"/>
              <Rating name="read-only" value={2} max={2} readOnly size="small"
                      className="d-flex justify-content-around"/>
            </span>
                </Button>

                <Button
                    component="fieldset"
                    variant="outlined"
                    size="small"
                    className="m-1"
                    onClick={() => {
                        props.getStarsRatingToDisplay("five")
                    }}
                >
            <span>
              <Rating name="read-only" value={2} max={2} readOnly size="small" className="d-flex"/>
              <Rating name="read-only" value={2} max={1} readOnly size="small"
                      className="d-flex justify-content-around"/>
              <Rating name="read-only" value={2} max={2} readOnly size="small" className="d-flex"/>
            </span>
                </Button>
            </div>

            <div>
                <h6><strong>Popular Filters</strong></h6>

                <List className="row">
                    <div className="col-6">
                        {filterParams.slice(0, secondColumnStart + 1)
                            .map((item, index) => {
                                const labelId = `checkbox-list-label-${item}`;
                                return (
                                    <div className='col-12'>
                                        <ListItem
                                            key={index}
                                            role={undefined}
                                            dense
                                            button
                                            onClick={handleToggle(item.name)}
                                        >
                                            <ListItemIcon>
                                                {item.avatarIcon}
                                            </ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={item.checked}
                                                tabIndex={-1}
                                                color="primary"
                                                disableRipple
                                                inputProps={{"aria-labelledby": labelId}}
                                            />
                                            <ListItemText id={labelId} primary={item.name}/>
                                        </ListItem>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <div className="col-6">
                        {filterParams.slice(secondColumnStart + 1)
                            .map((item, index) => {
                                const labelId = `checkbox-list-label-${item}`;
                                return (
                                    <div className='col-12'>
                                        <ListItem
                                            key={index}
                                            role={undefined}
                                            dense
                                            button
                                            onClick={handleToggle(item.name)}
                                        >
                                            <ListItemIcon>
                                                {item.avatarIcon}
                                            </ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={item.checked}
                                                tabIndex={-1}
                                                color="primary"
                                                disableRipple
                                                inputProps={{"aria-labelledby": labelId}}
                                            />
                                            <ListItemText id={labelId} primary={item.name}/>
                                        </ListItem>
                                    </div>
                                );
                            })
                        }
                    </div>
                </List>
            </div>

            <div className="d-flex justify-content-between">
                <Button className="m-2"
                        color="primary"
                        endIcon={<RefreshIcon/>}
                        onClick={handleReset}>Reset</Button>

                <Button
                    color="primary"
                    endIcon={<CancelIcon/>}
                    onClick={props.handleClose}
                >
                    Close
                </Button>
            </div>
        </div>
    );
}
