import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  DateField
} from "react-admin";

const FullNameField = ({ record = {} }) => (
  <div className="fullName">
    <div>Name</div>
    <div>
      {record.firstName} {record.lastName}
    </div>
  </div>
);
FullNameField.defaultProps = { label: "Name" };

const StaffShow = props => {
  console.log(props, "this is show props");
  return (
    <Show title="Staff Details" {...props}>
      <SimpleShowLayout>
        {/* <FullNameField source="lastName" /> */}
        <TextField
          className="customLayout"
          label="First Name"
          source="firstName"
        />
        <TextField
          className="customLayout"
          label="Last Name"
          source="lastName"
        />

        <EmailField className="customLayout" source="email" />
        <TextField className="customLayout" source="cellPhone" />
        <TextField className="customLayout" source="workPhone" />
        <TextField className="customLayout" source="homePhone" />
        <DateField className="customLayout" source="registrationDate" />
        <TextField className="customLayout" source="role" />
      </SimpleShowLayout>
    </Show>
  );
};
export default StaffShow;
