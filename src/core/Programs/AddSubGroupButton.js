import React from "react";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "react-admin";

const styles = {
  button: {
    marginTop: "1em"
  }
};
// to={`/programgroups/${record.id}`}
const AddCommentButton = ({ classes, record }) => (
  <Button
    className={classes.button}
    variant="raised"
    component={Link}
    to={`/programgroups/create/${record.id}`}
    label="Add a Sub-Program"
    title="Add a Sub-Program"
  >
    <AddCircleIcon />
  </Button>
);

export default withStyles(styles)(AddCommentButton);
