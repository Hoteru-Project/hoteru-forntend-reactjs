import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import NavbarMenuItem from "./NavbarMenuItem/NavbarMenuItem";
import IconButton from "@material-ui/core/IconButton";


const NavbarMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    
        <IconButton onClick={handleClick} color="inherit">
                {props.menu.icon}
        {props.menu.name}

            </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {props.menu.items?.map((item) => <NavbarMenuItem handleClick={handleClose} item={item} />)}
      </Menu>
    </>
  );
};
export default NavbarMenu;
