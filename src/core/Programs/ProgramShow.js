import React from "react";
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  DateField,
  Datagrid,
  ReferenceManyField,
  CreateButton,
  EditButton,
  DeleteButton
} from "react-admin";

import { ShowButton, RichTextField, Tab, TabbedShowLayout } from "react-admin";
import AddSubGroupButton from "./AddSubGroupButton";

const ProgramShow = props => {
  return (
    <div>
      <Show {...props}>
        <SimpleShowLayout>
          <TextField className="customLayout" source="programName" />
          <NumberField className="customLayout" source="capacity" />
          <TextField className="customLayout" source="description" />
          <NumberField className="customLayout" source="programFees" />
          <NumberField className="customLayout" source="programHours" />
          <DateField className="customLayout" source="feesRevisionDate" />
          {/* <NumberField className="customLayout" source="numberOfHours" /> */}
          <TextField className="customLayout" source="revenueCode" />
          <br />
          <ReferenceManyField
            reference="programgroups"
            source="id"
            label="Program Groups"
            target="programid"
            sort="disable"
          >
            <Datagrid>
              <TextField source="groupName" />
              <TextField source="capacity" />
              <EditButton />
              <DeleteButton redirect="/programs" />
            </Datagrid>
          </ReferenceManyField>
          <AddSubGroupButton />
        </SimpleShowLayout>
        {/* <TabbedShowLayout>
          <Tab label="Program Info">
            <TextField source="programName" />
            <NumberField source="capacity" />
            <TextField source="description" />
            <NumberField source="programFees" />
            <NumberField source="programHours" />
            <DateField source="feesRevisionDate" />
            <TextField source="revenueCode" />
          </Tab>

          <Tab label="Sub-Programs" path="programgroups">
            <ReferenceManyField
              addLabel={false}
              reference="programgroups"
              source="id"
              target="programid"
              sort="disable"
            >
              <Datagrid>
                <TextField source="groupName" />
                <TextField source="capacity" />
                <EditButton />
                <DeleteButton />
              </Datagrid>
            </ReferenceManyField>
           
          </Tab>
        </TabbedShowLayout> */}
      </Show>
    </div>
  );
};
export default ProgramShow;
