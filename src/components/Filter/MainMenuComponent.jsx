import React from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import HotelsFeaturesComponent from './HotelsFeaturesComponent';
import SortDropDown from '../Sort/SortDropDown';
import RatingRange from './RatingRangeComponent'



export default function MainMenuComponent(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sortID, setSortID] = React.useState();
  const [classRating, setClassRating] = React.useState();



  const handleMoreFiltersClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSetSortId = (sortID) => {
    setSortID(sortID.value);
    props.handleSortCallBack(sortID)
  }

  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  

  

  return (
  <div className="container">
        <div className="row" style={{"align-items" : "center"}}>
            <div className="col-6">
              <SortDropDown {...props} mainMenuGetSortId={handleSetSortId}/>
            </div>
            <div className="col-6">
              <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              <RatingRange getClassRatingToMenu= {props.getClassRatingToDisplay}/>
              <Button onClick={handleMoreFiltersClick}>More Filters</Button>
              </ButtonGroup>
            </div>
        </div>
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
        <HotelsFeaturesComponent {...props} handleClose={handleClose}/>
        </Popover>
    </div>
  );
}
