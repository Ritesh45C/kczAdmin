import React, { Fragment, useState } from "react";
import {
  Datagrid,
  EditButton,
  List,
  Responsive,
  ShowButton,
  SimpleList,
  EmailField,
  DateField,
  TextField
} from "react-admin";
import { Drawer } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Button from "@material-ui/core/Button";
import { CreateButton, ExportButton } from "react-admin";
import Toolbar from "@material-ui/core/Toolbar";
import StaffCheckin from "../../customComponents/Staffs/StaffCheckin";

const PostActions = ({
  basePath,
  currentSort,
  displayedFilters,
  exporter,
  filters,
  filterValues,
  resource,
  showFilter,
  checkin,
  total
}) => (
  <Toolbar>
    {filters &&
      React.cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: "button"
      })}
    <Button color="primary" onClick={checkin}>
      <AssignmentTurnedInIcon /> Check In
    </Button>
    <CreateButton label="Add Staff" basePath={basePath} />
    <ExportButton
      disabled={total === 0}
      resource={resource}
      sort={currentSort}
      filter={filterValues}
      exporter={exporter}
    />
  </Toolbar>
);

const simpleMapper = record => record.firstName + " " + record.lastName;
const FullNameField = ({ record = {} }) => (
  <span>
    {record.firstName} {record.lastName}
  </span>
);
FullNameField.defaultProps = { label: "Name" };

function StaffList(props) {
  const [open, setOpen] = useState(false);
  const checkin = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <List {...props} actions={<PostActions checkin={checkin} />}>
        <Responsive
          small={<SimpleList primaryText={simpleMapper} />}
          medium={
            <Datagrid rowClick="show">
              <FullNameField source="lastName" />

              <EmailField source="email" />
              <TextField source="cellPhone" />
              <TextField source="workPhone" />
              <TextField source="homePhone" />
              <DateField source="registrationDate" />
              <EditButton />
              <ShowButton />
            </Datagrid>
          }
        />
      </List>
      {/* Staff checkin Drawer */}
      <Drawer open={open} anchor="right" onClose={handleClose}>
        <StaffCheckin props={props} close={handleClose} />
      </Drawer>
    </Fragment>
  );
}

export default StaffList;
