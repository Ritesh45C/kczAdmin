import React from "react";
import PropTypes from "prop-types";
import { Create, SaveButton, Toolbar, CardActions } from "react-admin/lib";
import StaffForm from "./StaffForm";
import CancelButton from "../../common/buttons/CancelButton";

export const StaffCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton label="Save" redirect="list" />
  </Toolbar>
);

export const PostEditActions = ({ basePath, ...props }) => (
  <CardActions>
    <CancelButton basePath={basePath} history={props.history} />
  </CardActions>
);

PostEditActions.propTypes = {
  basePath: PropTypes.string,
  history: PropTypes.object
};

const StaffCreate = props => (
  <Create actions={<PostEditActions {...props} />} {...props}>
    <StaffForm toolbar={<StaffCreateToolbar label="Add" {...props} />} />
  </Create>
);

StaffCreate.propTypes = {
  permissions: PropTypes.string
};

export default StaffCreate;
