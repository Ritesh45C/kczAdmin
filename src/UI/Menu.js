import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import compose from "recompose/compose";
import programs from "../core/Programs";
import child from "../core/Child";
import staff from "../core/Staff";
import payment from "../core/Payments";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import { withStyles } from "@material-ui/core/styles";

import { MenuItemLink, Responsive } from "react-admin";

import SubMenu from "./SubMenu";

const styles = {
  root: {
    color: "white",
    padding: "11px"
  }, // Style applied to the MenuItem from material-ui
  active: { fontWeight: "bold", backgroundColor: "c8c8c833" }, // Style applied when the menu item is the active one
  icon: { color: "#cacaca" }
  // Style applied to the icon
};

const Menu = ({ onMenuClick, classes, dense, open, logout }) => {
  const [state, setState] = useState({
    menuSales: false,
    menuCatalog: false,
    childCatalog: false,
    paymentCatolog: false
  });

  const handleToggle = menu => {
    setState(state => ({ ...state, [menu]: !state[menu] }));
  };

  return (
    <div className="sidebar">
      <MenuItemLink
        to={`/programs`}
        primaryText="Programs"
        onClick={onMenuClick}
        sidebarIsOpen={open}
        dense={dense}
        classes={classes}
        leftIcon={<programs.icon />}
      />

      <SubMenu
        handleToggle={() => handleToggle("menuCatalog")}
        isOpen={state.menuCatalog}
        sidebarIsOpen={open}
        name="Staff"
        classes={classes}
        dense={dense}
        icon={<staff.icon />}
      >
        <MenuItemLink
          to={`/staffs`}
          primaryText="Staffs"
          onClick={onMenuClick}
          sidebarIsOpen={open}
          classes={classes}
          dense={dense}
          leftIcon={<staff.icon />}
        />
        <MenuItemLink
          to={`/staffattendances`}
          primaryText="Staff Attendence"
          onClick={onMenuClick}
          classes={classes}
          sidebarIsOpen={open}
          dense={dense}
          leftIcon={<AssignmentTurnedInIcon />}
        />
      </SubMenu>

      <MenuItemLink
        to={`/childs`}
        primaryText="Child"
        onClick={onMenuClick}
        sidebarIsOpen={open}
        classes={classes}
        dense={dense}
        leftIcon={<child.icon />}
      />

      <MenuItemLink
        to={`/payments`}
        primaryText="Payment"
        onClick={onMenuClick}
        sidebarIsOpen={open}
        classes={classes}
        dense={dense}
        leftIcon={<payment.icon />}
      />
    </div>
  );
};

Menu.propTypes = {
  onMenuClick: PropTypes.func,
  logout: PropTypes.object
};

const mapStateToProps = state => ({
  open: state.admin.ui.sidebarOpen,
  theme: state.theme
});

// const enhance = compose(withRouter, connect(mapStateToProps, {}));

const enhance = compose(
  withStyles(styles, { name: "Menu" }),
  connect(mapStateToProps, {})
);
export default enhance(Menu);
