import React, { Fragment, useState, useEffect } from "react";
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
  DateInput,
  Filter,
  showNotification,
  refreshView,
  ExportButton,
  Toolbar,
  CreateButton,
  BooleanField
} from "react-admin";
import { connect } from "react-redux";
import { downloadCSV } from "react-admin";
import jsonExport from "jsonexport";

import { Button } from "@material-ui/core";
import setAuthToken from "../DataProvider/setAuthToken";
import Axios from "axios";

const simpleMapper = record => record.programName;
const PostFilter = props => (
  <Filter {...props}>
    <DateInput source="month" alwaysOn />
  </Filter>
);

const FullNameField = ({ record = {} }) => (
  <span>
    {record.child.firstName} {record.child.lastName}
  </span>
);
FullNameField.defaultProps = { label: "Child Name" };

/////////////////////

const PostActions = ({
  basePath,
  currentSort,
  displayedFilters,
  exporter,
  filters,
  filterValues,
  onUnselectItems,
  resource,
  selectedIds,
  showFilter,
  checkin,
  maxResults,
  permanentFilter,

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
    <CreateButton basePath={basePath} />
    <ExportButton
      disabled={total === 0}
      resource={resource}
      sort={currentSort}
      filter={{ ...filterValues, ...permanentFilter }}
      exporter={exporter}
      maxResults={maxResults}
    />
  </Toolbar>
);

function PaymentList(props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("2020-01-01");
  const [error, setError] = useState("");

  useEffect(() => {
    var utc = new Date().toJSON().slice(0, 10);
    setDate(utc);
  }, [date]);
  const handleChange = e => {
    setOpen(true);
  };

  const selectAll = ids => {
    var data = {};
    data.listOfIds = ids;
    // props.commentApprove(data);
    setError("");
    var token = localStorage.getItem("accessToken");
    var daycareId = localStorage.getItem("daycareId");

    // console.log(token, "this is token");
    setAuthToken(token);

    Axios.post(
      `https://secret-brushlands-27116.herokuapp.com/api/daycare/${daycareId}/payments/generateDepositSlips`,
      data
    )
      .then(res => {
        console.log(res);
        setOpen(false);
        props.refreshView();
        props.showNotification("Successfully Generated!");
      })
      .catch(err => {
        setError("Error occured!");
      });

    console.log(data);
  };
  const PostBulkActionButtons = props => (
    <Fragment>
      {/* <Button onClick={props.handleChange}>Choose Action</Button> */}
      <div style={{ color: "red", textAlign: "center" }}>{error}</div>

      <Button
        variant="contained"
        color="primary"
        onClick={() => selectAll(props.selectedIds)}
      >
        Generate Deposit Slip
      </Button>
      {/* <Select ids={props.selectedIds} refresh={refreshList} /> */}
    </Fragment>
  );

  const exporter = posts => {
    const postsForExport = posts.map(post => {
      console.log(post);
      const postForExport = {};
      postForExport.firstName = post.child.firstName; // add a field
      postForExport.lastName = post.child.lastName;
      postForExport.month = new Date(post.month);
      postForExport.notes = post.notes;
      postForExport.amount = post.amount;
      postForExport.depositedInBank = post.depositedInBank;
      postForExport.depositSlipGenerated = post.depositSlipGenerated;
      console.log(post, postForExport);
      return postForExport;
    });
    jsonExport(
      postsForExport,
      {
        headers: ["firstName", "lastName"] // order fields in the export
      },
      (err, csv) => {
        downloadCSV(csv, `payments ${date}`); // download as 'posts.csv` file
      }
    );
  };

  return (
    <List
      {...props}
      filters={<PostFilter />}
      filterDefaultValues={{ month: date }}
      exporter={exporter}
      bulkActionButtons={<PostBulkActionButtons handleChange={handleChange} />}
    >
      <Responsive
        small={<SimpleList primaryText={simpleMapper} />}
        medium={
          <Datagrid rowClick="show">
            <FullNameField source="child.firstName" />
            <DateField source="month" />
            <NumberField source="amount" />
            <TextField source="notes" />

            <TextField source="depositType" />
            <BooleanField source="depositedInBank" />
            <BooleanField source="depositSlipGenerated" />
            <EditButton />
            <ShowButton />
          </Datagrid>
        }
      />
    </List>
  );
}

export default connect(undefined, {
  refreshView: refreshView,
  showNotification
})(PaymentList);
