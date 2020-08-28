import React from "react";
import {
  Datagrid,
  EditButton,
  List,
  Responsive,
  ShowButton,
  SimpleList,
  NumberField,
  DateField,
  TextField,
  DeleteButton
} from "react-admin";
import { withStyles } from "@material-ui/core/styles";

const simpleMapper = record => record.programName;
const listStyles = {
  root: {
    backgroundColor: "Lavender",
    color: "blue"
  },
  header: {
    color: "Lavender"
  },
  list: {
    color: "blue"
  }
};
const ProgramList = withStyles(listStyles)(({ classes, ...props }) => (
  <List {...props} bulkActionButtons={false}>
    <Responsive
      small={<SimpleList primaryText={simpleMapper} />}
      medium={
        <Datagrid className={classes.header} rowClick="show">
          <TextField source="programName" />
          <NumberField source="capacity" />
          <TextField source="description" />
          <NumberField source="programFees" />
          <NumberField source="programHours" />
          <DateField source="feesRevisionDate" />
          <TextField source="revenueCode" />
          <EditButton />
          <ShowButton />
          <DeleteButton />
        </Datagrid>
      }
    />
  </List>
));

export default ProgramList;
