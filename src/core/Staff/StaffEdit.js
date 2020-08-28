import React from "react";
import PropTypes from "prop-types";
import { Edit, SaveButton, Toolbar } from "react-admin";
import CancelButton from "../../common/buttons/CancelButton";
import _ from "underscore";
import StaffForm from "./StaffForm";

const StaffEditToolbar = ({ basePath, ...props }) => {
  props.record.id = props.id;
  return (
    <Toolbar {...props}>
      <SaveButton label="Save" redirect="show" />
      <CancelButton basePath={basePath} history={props.history} />
    </Toolbar>
  );
};

StaffEditToolbar.propTypes = {
  basePath: PropTypes.string,
  resource: PropTypes.string,
  data: PropTypes.object,
  history: PropTypes.object
};

const StaffEdit = props => {
  const innerProps = _.omit(
    props,
    "hasshow",
    "hasedit",
    "haslist",
    "hascreate"
  );
  return (
    <Edit {...innerProps} resource="staffs">
      <StaffForm
        toolbar={<StaffEditToolbar {...innerProps} resource="staffs" />}
      />
    </Edit>
  );
};

StaffEdit.propTypes = {
  permissions: PropTypes.string
};

export default StaffEdit;
