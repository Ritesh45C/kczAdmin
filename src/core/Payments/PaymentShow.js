import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  EditButton,
  DateField,
  BooleanField,
  NumberField,
  Toolbar
} from "react-admin";
import Button from "@material-ui/core/Button";

const PaymentShow = props => {
  console.log(props, "this is show props");
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField
          className="customLayout"
          label="First Name"
          source="child.firstName"
        />
        <TextField
          className="customLayout"
          label="Last Name"
          source="child.lastName"
        />
        <TextField className="customLayout" source="daycare.unitName" />
        <TextField className="customLayout" source="daycare.unitAddress" />
        <DateField className="customLayout" source="month" />
        <NumberField className="customLayout" source="amount" />
        <BooleanField className="customLayout" source="depositedInBank" />
        <BooleanField className="customLayout" source="depositSlipGenerated" />
      </SimpleShowLayout>
    </Show>
  );
};
export default PaymentShow;
