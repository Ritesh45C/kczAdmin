import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getFormValues } from "redux-form";
import { Button } from "@material-ui/core";
import {
  SimpleForm,
  Toolbar,
  ReferenceInput,
  showNotification,
  SelectInput
} from "react-admin";
import setAuthToken from "../../core/DataProvider/setAuthToken";

function StaffCheckin(props) {
  console.log(props);
  const checkin = value => {
    const daycareId = localStorage.getItem("daycareId");
    const token = localStorage.getItem("accessToken");

    setAuthToken(token);

    axios
      .post(
        `https://secret-brushlands-27116.herokuapp.com/api/daycare/${daycareId}/staffattendances/${value}`
      )
      .then(res => {
        props.close();
        props.refresh();
        props.showNotification("Successfully Checked In");
      })
      .catch(err => {
        props.showNotification("Error occured!");
      });
  };

  const PostCreateToolbar = props => {
    return (
      <Toolbar {...props}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => checkin(props.values.firstName)}
        >
          Check In
        </Button>
      </Toolbar>
    );
  };
  const FullNameField = ({ record }) => (
    <span>
      {record.firstName} {record.lastName}
    </span>
  );

  return (
    <div className="simpleForm">
      <SimpleForm
        toolbar={<PostCreateToolbar values={props.recordLiveValues} />}
        save="false"
      >
        <ReferenceInput
          source="firstName"
          label="Staff Name"
          reference="staffs"
          allowEmpty
          filterToQuery={searchText => ({ title: searchText })}
        >
          <SelectInput optionText={<FullNameField />} />
        </ReferenceInput>
      </SimpleForm>
    </div>
  );
}

const mapStateToProps = state => ({
  recordLiveValues: getFormValues("record-form")(state)
});

export default connect(mapStateToProps, { showNotification })(StaffCheckin);
