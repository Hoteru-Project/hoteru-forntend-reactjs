import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from '@material-ui/core/Icon';
import PoolIcon from '@material-ui/icons/Pool';



export default function HotelsFeatures(props) {

  const [filterParams,setFilterParams] = React.useState([
    {name:"Pool",avatarIcon:<PoolIcon/>,checked:false},
    // the rest of the filter params to be continued
  ])

  const handleToggle = (value) => () => {
    const currentIndex = props.checkedFilters.indexOf(value);
    const newChecked = [...props.checkedFilters];

    
    let newFilterParams ;
    if (currentIndex === -1) {
      newChecked.push(value);
      newFilterParams = filterParams.map(item=>{if(item.name == value){item.checked=true} return item;})
    } else {
      newChecked.splice(currentIndex, 1);
      newFilterParams = filterParams.map(item=>{if(item.name == value){item.checked=false} return item;})
    }
    props.setCheckedFilters(newChecked);
    setFilterParams(newFilterParams);
  };

  return (
    <List>
      {filterParams.map((item,index) => {
        const labelId = `checkbox-list-label-${item}`;
        return (
          <ListItem
            key={index}
            role={undefined}
            dense
            button
            onClick={handleToggle(item.name)}
          >
            <ListItemIcon>
              {item.avatarIcon}
              <Checkbox
                edge="start"
                checked={item.checked}
                tabIndex={-1}
                color="primary"
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={item.name} />
          </ListItem>
        );
      })}
    </List>
  );
}
