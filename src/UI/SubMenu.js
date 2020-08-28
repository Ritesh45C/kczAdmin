import React, { Fragment } from "react";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  icon: { minWidth: "20px", color: "#cacaca" },
  text: { color: "#cacaca" },
  menuItem: { color: "#cacaca", backgroundColor: "c8c8c833" },
  sidebarIsOpen: {
    paddingLeft: 25,
    transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
  },
  sidebarIsClosed: {
    paddingLeft: 0,
    transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
  }
};

const SubMenu = ({
  handleToggle,
  sidebarIsOpen,
  isOpen,
  name,
  icon,
  classes,
  children
}) => {
  const header = (
    <MenuItem className={classes.menuItem} dense button onClick={handleToggle}>
      <ListItemIcon className={classes.icon}>
        {isOpen ? <ExpandMore /> : icon}
      </ListItemIcon>
      <Typography
        className={classes.text}
        variant="inherit"
        color="textSecondary"
      >
        {name}
      </Typography>
    </MenuItem>
  );

  return (
    <Fragment>
      {sidebarIsOpen || isOpen ? (
        header
      ) : (
        <Tooltip title={name} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          dense
          component="div"
          disablePadding
          className={
            sidebarIsOpen ? classes.sidebarIsOpen : classes.sidebarIsClosed
          }
        >
          {children}
        </List>
        <Divider />
      </Collapse>
    </Fragment>
  );
};

export default withStyles(styles)(SubMenu);
