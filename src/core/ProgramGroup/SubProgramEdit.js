import React from "react";
import PropTypes from "prop-types";
import { Edit, SaveButton, Toolbar } from "react-admin";
import CancelButton from "../../common/buttons/CancelButton";
import SubProgramForm from "./SubProgramForm";
import _ from "underscore";

const SubProgramEditToolbar = ({ basePath, ...props }) => {
  props.record.id = props.id;
  return (
    <Toolbar {...props}>
      <SaveButton label="Save" redirect="edit" />
      <CancelButton basePath={basePath} history={props.history} />
    </Toolbar>
  );
};

SubProgramEditToolbar.propTypes = {
  basePath: PropTypes.string,
  resource: PropTypes.string,
  data: PropTypes.object,
  history: PropTypes.object
};

const SubProgramEdit = props => {
  const innerProps = _.omit(
    props,
    "hasshow",
    "hasedit",
    "haslist",
    "hascreate"
  );
  return (
    <Edit {...innerProps} resource="programgroups">
      <SubProgramForm
        toolbar={
          <SubProgramEditToolbar {...innerProps} resource="programgroups" />
        }
      />
    </Edit>
  );
};

SubProgramEdit.propTypes = {
  permissions: PropTypes.string
};

export default SubProgramEdit;
