import React from "react";
import PropTypes from "prop-types";
import {
  required,
  NumberInput,
  maxLength,
  minLength,
  SimpleForm,
  TextInput,
  DateInput
} from "react-admin";

const isRequired = required();

export const updateSave = save => {
  return async (values, redirect) => {
    const newValues = {
      ...values
    };

    return save(newValues, redirect);
  };
};

const minNameLength = 2;
const maxNameLength = 50;
const validateName = [
  required(),
  minLength(minNameLength),
  maxLength(maxNameLength)
];

const ChildForm = ({ toolbar, defaultValue, record, save }) => {
  const newSave = updateSave(save);

  return (
    <SimpleForm
      toolbar={toolbar}
      defaultValue={defaultValue}
      save={newSave}
      record={record}
    >
      <TextInput
        source="programName"
        label="Program Name"
        validate={validateName}
      />
      <NumberInput source="capacity" label="Capacity" validate={isRequired} />
      <TextInput
        source="description"
        label="Program Description"
        validate={isRequired}
      />
      <NumberInput
        source="programFees"
        label="Program Fees"
        validate={isRequired}
      />
      <NumberInput
        source="programHours"
        label="Daily Hours"
        validate={isRequired}
      />
      <DateInput
        source="feesRevisionDate"
        label="Fees Revision Date"
        validate={isRequired}
      />
      <TextInput source="revenueCode" label="Revenue Code" />
    </SimpleForm>
  );
};

ChildForm.propTypes = {
  permissions: PropTypes.string,
  toolbar: PropTypes.node,
  defaultValue: PropTypes.object,
  record: PropTypes.object,
  save: PropTypes.func
};

export default ChildForm;
