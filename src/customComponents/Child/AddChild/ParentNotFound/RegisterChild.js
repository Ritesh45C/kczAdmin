import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import {
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  withStyles,
  LinearProgress,
  CircularProgress
} from "@material-ui/core";

import setAuthToken from "../../../../core/DataProvider/setAuthToken";

import green from "@material-ui/core/colors/green";

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class RegisterChild extends Component {
  state = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    languagesSpoken: "",
    address: "",
    doctorPhone: "",
    postalCode: "",
    doctorName: "",
    careCardNumber: "",
    gender: ""
  };
  componentDidMount() {
    // setting values if parent is found
    if (this.props.values) {
      const { values } = this.props;
      console.log(values);
      this.setState({
        id: values.id,
        firstName: values.firstName,
        lastName: values.lastName,
        dateOfBirth: values.dateOfBirth,
        languagesSpoken: values.languagesSpoken,
        address: values.address,
        doctorPhone: values.doctorPhone,
        postalCode: values.postalCode,
        doctorName: values.doctorName,
        careCardNumber: values.careCardNumber,
        gender: values.gender,
        loading: false
      });
    }
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  continue = e => {
    e.preventDefault();
    var token = localStorage.getItem("accessToken");
    var daycareId = localStorage.getItem("daycareId");

    setAuthToken(token);
    if (!this.checkChildAge()) {
      if (this.props.updateProp || this.props.editChild) {
        delete this.state.loading;
        if (
          window.confirm("Confirm if all the details for child are correct")
        ) {
          this.setState({ loading: true });
          this.props.registerChildValues(this.state);
          axios
            .put(
              `https://secret-brushlands-27116.herokuapp.com/api/daycare/${daycareId}/childs`,
              this.state
            )
            .then(res => {
              this.setState({ loading: false });
              if (this.props.editChild) {
                this.props.close();
                window.location.reload();
              } else {
                this.props.nextStep();
              }
            })
            .catch(err =>
              this.setState({ error: "error occurred!", loading: false })
            );
        } else {
          // Do nothing!
        }
      } else {
        var data = this.state;
        this.props.registerChildValues(data);
        delete data.id;
        delete data.loading;
        delete data.error;
        if (
          window.confirm("Confirm if all the details for child are correct")
        ) {
          this.props.registerChildValues(data);
          this.setState({ loading: true });
          axios
            .post(
              `https://secret-brushlands-27116.herokuapp.com/api/daycare/${daycareId}/childs`,
              data
            )
            .then(res => {
              this.setState({ loading: false });
              localStorage.setItem("childId", res.data.id);
              this.props.nextStep();
            })
            .catch(err =>
              this.setState({ error: "error occurred!", loading: false })
            );
        } else {
          // Do nothing!
        }
      }
    } else return;
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getFullYear()), pad(d.getMonth() + 1), d.getDate()].join("-");
  }

  checkChildAge() {
    if (
      new Date().getFullYear() -
        new Date(this.state.dateOfBirth).getFullYear() >=
      12
    ) {
      alert("Child Age can not greater than 12");
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { values } = this.props;
    var convertedDate = this.convertDate(this.state.dateOfBirth);
    this.checkChildAge();
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Register child</h3>
        <div style={{ color: "red", textAlign: "center" }}>
          {this.state.error}
        </div>
        <div className="backButton">
          <Button
            color="primary"
            variant="contained"
            onClick={this.props.prevStep}
          >
            Back
          </Button>
        </div>

        <LinearProgress variant="determinate" value="65" />
        <div className="enrollChild">
          <TextField
            id="outlined-email-input"
            label="First Name"
            type="text"
            name="firstName"
            autoComplete="firstName"
            onChange={this.handleChange("firstName")}
            value={this.state.firstName}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="outlined-name"
            onChange={this.handleChange("lastName")}
            value={this.state.lastName}
            label="Last Name"
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="date"
            label="Date Of Birthday"
            type="date"
            onChange={this.handleChange("dateOfBirth")}
            value={convertedDate}
            InputLabelProps={{
              shrink: true
            }}
          />
          <InputLabel htmlFor="age-simple">Gender</InputLabel>
          <Select
            onChange={this.handleChange("gender")}
            value={this.state.gender}
            InputLabelProps={{
              shrink: true
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
          <TextField
            label="Languages Spoken"
            type="text"
            name="languagesSpoken"
            onChange={this.handleChange("languagesSpoken")}
            value={this.state.languagesSpoken}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Address"
            type="text"
            name="address"
            onChange={this.handleChange("address")}
            value={this.state.address}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
          <TextField
            id="standard-number"
            label="Doctor Phone"
            type="tel"
            name="doctorPhone"
            onChange={this.handleChange("doctorPhone")}
            value={this.state.doctorPhone}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
          <TextField
            id="standard-number"
            label="Postal Code"
            name="postalCode"
            onChange={this.handleChange("postalCode")}
            value={this.state.postalCode}
            margin="normal"
            variant="outlined"
            inputProps={{ maxLength: 6 }}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Care Card Number"
            type="text"
            name="careCardNumber"
            onChange={this.handleChange("careCardNumber")}
            value={this.state.careCardNumber}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Doctor Name"
            type="text"
            name="doctorName"
            onChange={this.handleChange("doctorName")}
            value={this.state.doctorName}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
          <div className={this.props.classes.wrapper}>
            <Button color="primary" variant="contained" onClick={this.continue}>
              {this.props.editChild ? "Edit" : "Continue"}
            </Button>
            {this.state.loading && (
              <CircularProgress
                size={24}
                className={this.props.classes.buttonProgress}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(RegisterChild);
