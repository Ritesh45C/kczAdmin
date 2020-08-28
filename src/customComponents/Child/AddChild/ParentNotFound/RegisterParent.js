import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Button,
  LinearProgress,
  CircularProgress,
  withStyles
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  wrapper: {
    margin: "auto",
    position: "relative",
    paddingTop: "10px"
  },

  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -10,
    marginLeft: -12
  }
});

class RegisterParent extends Component {
  state = {
    email: "",
    cellPhone: "",
    workPhone: "",
    homePhone: "",
    firstName: "",
    lastName: "",
    // registrationDate: "",
    password: ""
  };

  componentDidMount() {
    // setting values if parent is found
    if (this.props.values) {
      const { values } = this.props;
      console.log(values);
      this.setState({
        id: values.id,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        cellPhone: values.cellPhone,
        workPhone: values.workPhone,
        homePhone: values.homePhone
      });
    }
  }
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  continue = e => {
    e.preventDefault();
    var password = this.state.password;
    delete this.state.password;
    if (this.props.values) {
      this.props.updateParent(this.state, password);
    } else {
      this.props.registerParent(this.state, password);
    }
  };

  render() {
    var values;
    if (this.props.values) {
      values = this.props.values;
    } else {
      values = this.state;
    }

    return (
      <div>
        <h3 style={{ textAlign: "center" }}>Register Parent</h3>

        <div style={{ color: "red", textAlign: "center" }}>
          {this.props.registerParentError}
        </div>

        <br />
        <LinearProgress variant="determinate" value="30" />

        <div className="enrollChild">
          <TextField
            id="outlined-email-input"
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            onChange={this.handleChange("email")}
            defaultValue={values.email}
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="firstName"
            id="outlined-name"
            onChange={this.handleChange("firstName")}
            defaultValue={values.firstName}
            label="First Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            name="lastName"
            id="outlined-name"
            onChange={this.handleChange("lastName")}
            defaultValue={values.lastName}
            label="Last Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            id="standard-number"
            label="CellPhone"
            type="tel"
            name="cellPhone"
            onChange={this.handleChange("cellPhone")}
            defaultValue={values.cellPhone}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="standard-number"
            label="Work Phone"
            type="tel"
            name="workPhone"
            onChange={this.handleChange("workPhone")}
            defaultValue={values.workPhone}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="standard-number"
            label="Home Phone"
            type="tel"
            name="homePhone"
            onChange={this.handleChange("homePhone")}
            defaultValue={values.homePhone}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            name="password"
            onChange={this.handleChange("password")}
            defaultValue={values.password}
            type="password"
            margin="normal"
            variant="outlined"
          />
          <div className={this.props.classes.wrapper}>
            <Button color="primary" variant="contained" onClick={this.continue}>
              Continue
            </Button>
            {this.props.loading && (
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
export default withStyles(styles)(RegisterParent);
