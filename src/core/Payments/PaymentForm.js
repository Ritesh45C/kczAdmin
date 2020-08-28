import React from "react";
import PropTypes from "prop-types";
import {
  required,
  NumberInput,
  maxLength,
  minLength,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  DateInput,
  AutocompleteInput,
  BooleanInput
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

const PaymentForm = ({ toolbar, defaultValue, record, save }) => {
  const newSave = updateSave(save);
  const FullNameField = ({ record }) => (
    <span>
      {record.child.firstName} {record.child.lastName}
    </span>
  );
  return (
    <div className="simpleForm">
      <SimpleForm
        toolbar={toolbar}
        defaultValue={defaultValue}
        save={newSave}
        record={record}
      >
        <ReferenceInput
          source="id"
          label="Child Name"
          reference="childs"
          alwaysOn
        >
          {/* <AutocompleteInput
            optionText="child.firstName"
            optionValue="child.firstName"
          /> */}

          <SelectInput optionValue="id" optionText={<FullNameField />} />
        </ReferenceInput>
        <DateInput source="month" label="Month" validate={validateName} />
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
    </div>
  );
};

PaymentForm.propTypes = {
  permissions: PropTypes.string,
  toolbar: PropTypes.node,
  defaultValue: PropTypes.object,
  record: PropTypes.object,
  save: PropTypes.func
};

export default PaymentForm;
