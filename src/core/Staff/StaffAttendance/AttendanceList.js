import React, { useState, Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Datagrid,
  List,
  Responsive,
  SimpleList,
  DateField,
  TextField,
  refreshView
} from "react-admin";
import { Drawer, Toolbar } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import { Button } from "@material-ui/core";
import setAuthToken from "../../DataProvider/setAuthToken";
import StaffCheckin from "../../../customComponents/Staffs/StaffCheckin";
import { downloadCSV } from "react-admin";
import jsonExport from "jsonexport";
import { ExportButton } from "react-admin";

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
    <ExportButton
      disabled={total === 0}
      resource={resource}
      sort={currentSort}
      filter={filterValues}
      exporter={exporter}
    />
  </Toolbar>
);

const exporter = posts => {
  const postsForExport = posts.map(post => {
    console.log(post);
    const { user, ...postForExport } = post; // omit backlinks and author
    postForExport.firstName = post.user.firstName; // add a field
    postForExport.lastName = post.user.lastName;
    postForExport.email = post.user.email; // add a field
    console.log(post, postForExport);
    return postForExport;
  });
  jsonExport(
    postsForExport,
    {
      headers: ["firstName", "lastName", "email"] // order fields in the export
    },
    (err, csv) => {
      downloadCSV(csv, "staff_attendances"); // download as 'posts.csv` file
    }
  );
};
const simpleMapper = record => record.user.firstName;
const FullNameField = ({ record = {} }) => (
  <span>
    {record.user.firstName} {record.user.lastName}
  </span>
);
FullNameField.defaultProps = { label: "Name" };

const consoles = record => record.id;
console.log(consoles);
function AttendanceList(props, record) {
  const [open, setOpen] = useState(false);
  const checkin = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <List
        {...props}
        exporter={exporter}
        actions={<PostActions checkin={checkin} />}
      >
        <Responsive
          small={<SimpleList primaryText={simpleMapper} />}
          medium={
            <Datagrid rowClick="show">
              <TextField source="user.email" />
              <FullNameField source="lastName" />

              <DateField source="checkInTime" showTime />
              <DualReferenceField
                source="checkOutTime"
                newProps={props.history}
                refresh={props.refreshView}
                label="CheckOutTime"
              />
            </Datagrid>
          }
        />
      </List>
      {/* Staff checkin Drawer */}
      <Drawer open={open} anchor="right" onClose={handleClose}>
        <StaffCheckin
          refresh={props.refreshView}
          props={props}
          close={handleClose}
        />
      </Drawer>
    </Fragment>
  );
}

export default connect(undefined, { refreshView: refreshView })(AttendanceList);

const DualReferenceField = props => {
  const daycareId = localStorage.getItem("daycareId");
  var [disable, setDisable] = useState(false);
  const token = localStorage.getItem("accessToken");
  const id = props.record.id;
  console.log(props, "this is props");
  const hasCheckOutTime = props.record.checkOutTime;
  setAuthToken(token);
  const clicked = id => {
    axios
      .patch(
        `https://secret-brushlands-27116.herokuapp.com/api/daycare/${daycareId}/staffattendances/${id}`
      )
      .then(res => {
        setDisable(true);
        props.newProps.goBack();
        props.refresh();
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      {hasCheckOutTime ? (
        <div>{hasCheckOutTime}</div>
      ) : (
        <Button color="primary" disabled={disable} onClick={() => clicked(id)}>
          Check Out
        </Button>
      )}
    </>
  );
};
