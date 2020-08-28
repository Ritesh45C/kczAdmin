import React from "react";
import PropTypes from "prop-types";
import { Edit, SaveButton, Toolbar } from "react-admin";
import CancelButton from "../../common/buttons/CancelButton";
import ProgramForm from "./ProgramForm";
import _ from "underscore";

const ProgramEditToolbar = ({ basePath, ...props }) => {
  props.record.id = props.id;
  return (
    <Toolbar {...props}>
      <SaveButton label="Save" redirect="show" />
      <CancelButton basePath={basePath} history={props.history} />
    </Toolbar>
  );
};

ProgramEditToolbar.propTypes = {
  basePath: PropTypes.string,
  resource: PropTypes.string,
  data: PropTypes.object,
  history: PropTypes.object
};

const ProgramEdit = props => {
  const innerProps = _.omit(
    props,
    "hasshow",
    "hasedit",
    "haslist",
    "hascreate"
  );
  return (
    <Edit {...innerProps} resource="programs">
      <ProgramForm
        toolbar={<ProgramEditToolbar {...innerProps} resource="programs" />}
      />
    </Edit>
  );
};

ProgramEdit.propTypes = {
  permissions: PropTypes.string
};

export default ProgramEdit;
