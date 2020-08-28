import React from "react";
import PropTypes from "prop-types";
import { Create, SaveButton, Toolbar, CardActions } from "react-admin/lib";
import ProgramForm from "./ProgramForm";
import CancelButton from "../../common/buttons/CancelButton";

export const ProgramCreateToolbar = props => (
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

const ProgramCreate = props => (
  <Create actions={<PostEditActions {...props} />} {...props}>
    <ProgramForm toolbar={<ProgramCreateToolbar label="Add" {...props} />} />
  </Create>
);

ProgramCreate.propTypes = {
  permissions: PropTypes.string
};

export default ProgramCreate;
