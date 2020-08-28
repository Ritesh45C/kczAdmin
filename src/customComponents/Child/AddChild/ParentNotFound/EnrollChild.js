import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  LinearProgress,
  TextField
} from "@material-ui/core";
import { connect } from "react-redux";
import { showNotification } from "react-admin";
import axios from "axios";
import setAuthToken from "../../../../core/DataProvider/setAuthToken";

class EnrollChild extends Component {
  state = {
    programs: [],
    programId: "",
    subPrograms: [],
    feedBack: ""
  };

  componentDidMount() {
    const daycareId = localStorage.getItem("daycareId");
    const token = localStorage.getItem("accessToken");
    this.setState({ daycareId: daycareId, token: token });
    setAuthToken(token);
    axios
      .get(
        `https://secret-brushlands-27116.herokuapp.com/api/daycare/${daycareId}/programs`
      )
      .then(res => this.setState({ programs: res.data }))
      .catch();
  }

  // finally enrolling the child //

  enrollChild = e => {
    const addGuardianData = {
      parentId: localStorage.getItem("parentId"),
      childId: localStorage.getItem("childId"),
      relationshipType: this.state.relationshipType
    };
    const enrollData = {
      programId: this.state.programId,
      programGroupId: this.state.programGroupId,
      parentId: localStorage.getItem("parentId"),
      childId: localStorage.getItem("childId"),
      daycareId: this.state.daycareId,
      fromDate: this.state.fromDate,
      toDate: this.state.toDate
    };
    e.preventDefault();
    console.log(enrollData);
    setAuthToken(this.state.token);
    axios
      .post(
        `https://secret-brushlands-27116.herokuapp.com/api/daycare/${this.state.daycareId}/parentChildRelationship`,
        addGuardianData
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
    axios
      .post(
        `https://secret-brushlands-27116.herokuapp.com/api/daycare/${this.state.daycareId}/enrollChild`,
        enrollData
      )
      .then(res => {
        this.setState({ feedBack: "Child Successfully enrolled! " });
        localStorage.removeItem("parentId");
        localStorage.removeItem("childId");

        this.props.props.history.push("/childs");
        this.props.showNotification("Child Successfully Added!");
      })
      .catch(err => {
        this.setState({ error: "Error Occured ! " });
      });
  };

  // enrolling function end//

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  // fetch subprograms for programs
  handlePrograms = event => {
    this.setState({ programId: event.target.value });
    setAuthToken(this.state.token);
    axios
      .get(
        `https://secret-brushlands-27116.herokuapp.com/api/daycare/${this.state.daycareId}/programgroups?programid=${event.target.value}`
      )
      .then(res => this.setState({ subPrograms: res.data }))
      .catch();
  };

  // set subprogram id
  handleSubPrograms = event => {
    this.setState({ programGroupId: event.target.value });
  };
  //////////////////////////////////////////////////////////////////

  render() {
    const { programs, subPrograms } = this.state;
    let selectPrograms;
    let selectSubprograms;

    if (programs.length > 0) {
      selectPrograms = programs.map(program => {
        return <MenuItem value={program.id}>{program.programName}</MenuItem>;
      });
    }

    if (subPrograms.length > 0) {
      selectSubprograms = subPrograms.map(program => {
        return <MenuItem value={program.id}>{program.groupName}</MenuItem>;
      });
    }
    return (
      <div open="true" fullWidth="true" maxWidth="sm">
        <h3 style={{ textAlign: "center" }}>Enroll child</h3>
        <div className="backButton">
          <Button
            color="primary"
            variant="contained"
            onClick={this.props.prevStep}
          >
            Back
          </Button>
        </div>
        <div style={{ color: "red", textAlign: "center" }}>
          {this.state.error}
        </div>
        <LinearProgress variant="determinate" value="90" />
        <div className="enrollChild">
          <InputLabel htmlFor="age-simple">Program Name</InputLabel>
          <Select value={this.state.programId} onChange={this.handlePrograms}>
            {selectPrograms}
          </Select>
          <InputLabel htmlFor="age-simple">Sub-Program Name</InputLabel>
          <Select
            value={this.state.programGroupId}
            onChange={this.handleSubPrograms}
          >
            {selectSubprograms}
          </Select>
          <TextField
            id="date"
            label="From Date"
            type="date"
            onChange={this.handleChange("fromDate")}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="date"
            label="To Date"
            type="date"
            onChange={this.handleChange("toDate")}
            InputLabelProps={{
              shrink: true
            }}
          />
          <div>
            <h3>Add Guardians For Child</h3>
            <TextField
              label="Relationship Type"
              type="text"
              name="relationshipType"
              onChange={this.handleChange("relationshipType")}
              margin="normal"
              variant="outlined"
            />
            <FormHelperText>Ex: Father,Mother...</FormHelperText>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={this.enrollChild}
          >
            Enroll Child
          </Button>
        </div>
      </div>
    );
  }
}
export default connect(null, { showNotification })(EnrollChild);
