import React from "react";
import PropTypes from "prop-types";
import {
  required,
  NumberInput,
  maxLength,
  minLength,
  SimpleForm,
  TextInput,
  SelectInput,
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

const StaffForm = ({ toolbar, defaultValue, record, save }) => {
  const newSave = updateSave(save);

  return (
    <SimpleForm
      toolbar={toolbar}
      defaultValue={defaultValue}
      save={newSave}
      record={record}
    >
      <TextInput
        source="firstName"
        label="First Name"
        validate={validateName}
      />
      <TextInput source="lastName" label="Last Name" validate={isRequired} />
      <TextInput source="email" label="Email " validate={isRequired} />
      <NumberInput
        source="cellPhone"
        label="Cell Phone"
        validate={isRequired}
      />
      <NumberInput
        source="workPhone"
        label="Work Phone"
        validate={isRequired}
      />
      <NumberInput
        source="homePhone"
        label="Home Phone"
        validate={isRequired}
      />
      <SelectInput
        source="role"
        validate={isRequired}
        choices={[
          { id: "staff", name: "Staff" },
          { id: "admin", name: "Admin" }
        ]}
      />
      <TextInput
        label="Password"
        source="password"
        type="password"
        validate={isRequired}
      />

      <DateInput
        source="registrationDate"
        label="Registration Date"
        validate={isRequired}
      />
    </SimpleForm>
  );
};

StaffForm.propTypes = {
  permissions: PropTypes.string,
  toolbar: PropTypes.node,
  defaultValue: PropTypes.object,
  record: PropTypes.object,
  save: PropTypes.func
};

export default StaffForm;
