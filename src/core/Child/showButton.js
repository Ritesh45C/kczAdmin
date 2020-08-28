import React from "react";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/core/styles";
import { ShowButton } from "react-admin";

const styles = {
  button: {
    marginTop: "1em"
  }
};
// to={`/programgroups/${record.id}`}
const showButton = ({ classes, record }) => (
  <ShowButton
    className={classes.button}
    variant="raised"
    component={Link}
    to={`/child/${record.id}`}
    label="Show"
    title="Show"
  ></ShowButton>
);

export default withStyles(styles)(showButton);
