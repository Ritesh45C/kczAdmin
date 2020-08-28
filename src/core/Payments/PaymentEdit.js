import React from "react";
import PropTypes from "prop-types";
import {
  Edit,
  SaveButton,
  Toolbar,
  SimpleForm,
  DateInput,
  NumberInput,
  BooleanInput,
  TextInput,
  SelectInput,
  required
} from "react-admin";
import CancelButton from "../../common/buttons/CancelButton";
import _ from "underscore";
import PaymentForm from "./PaymentForm";

const isRequired = required();

const PaymentEditToolbar = ({ basePath, ...props }) => {
  props.record.id = props.id;
  return (
    <Toolbar {...props}>
      <SaveButton label="Save" redirect="show" />
      <CancelButton basePath={basePath} history={props.history} />
    </Toolbar>
  );
};

PaymentEditToolbar.propTypes = {
  basePath: PropTypes.string,
  resource: PropTypes.string,
  data: PropTypes.object,
  history: PropTypes.object
};

const PaymentEdit = props => {
  const innerProps = _.omit(
    props,
    "hasshow",
    "hasedit",
    "haslist",
    "hascreate"
  );
  const FullNameField = ({ record }) => (
    <span>
      {record.child.firstName} {record.child.lastName}
    </span>
  );
  FullNameField.defaultProps = { label: "Name" };

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="child.firstName" />
        <TextInput source="child.lastName" />

        <DateInput source="month" label="Month" />
        <NumberInput source="amount" label="Amount" validate={isRequired} />
        <TextInput
          className="longText"
          source="notes"
          label="Notes"
          validate={isRequired}
        />
        <SelectInput
          source="depositType"
          validate={isRequired}
          choices={[
            { id: "Cheque", name: "Cheque" },
            { id: "Cash", name: "Cash" }
          ]}
        />
        <BooleanInput source="depositedInBank" label="depositedInBank" />
        <BooleanInput
          source="depositSlipGenerated"
          label="depositSlipGenerated"
        />
      </SimpleForm>
    </Edit>
  );
};

PaymentEdit.propTypes = {
  permissions: PropTypes.string
};

export default PaymentEdit;
