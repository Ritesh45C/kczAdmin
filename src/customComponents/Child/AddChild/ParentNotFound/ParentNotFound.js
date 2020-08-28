import React, { Component } from "react";
import axios from "axios";
import RegisterParent from "./RegisterParent";
import RegisterChild from "./RegisterChild";
import EnrollChild from "./EnrollChild";

export class UserForm extends Component {
  state = {
    registerParent: "",
    registerChildValues: "",
    registerParentError: "",
    step: 1,
    parentId: "",
    loading: false
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  registerChildValues = values => {
    this.setState({ registerChildValues: values });
    console.log("fired");
  };

  registerParent = (values, password) => {
    this.setState({ loading: true, registerParentError: "" });
    axios
      .post(
        `https://secret-brushlands-27116.herokuapp.com/api/users?password=${password}`,
        values
      )
      .then(res => {
        localStorage.setItem("parentId", res.data.id);
        this.setState({
          parentId: res.data.id,
          registerParent: res.data,
          loading: false
        });
        this.nextStep();
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          loading: false,
          registerParentError: error.response.data.errorMessage
        });
      });
  };

  updateParent = (values, password) => {
    this.setState({ loading: true, registerParentError: "" });
    axios
      .put(
        `https://secret-brushlands-27116.herokuapp.com/api/users?password=${password}`,
        values
      )
      .then(res => {
        this.setState({
          parentId: res.data.id,
          registerParent: res.data,
          loading: false
        });
        this.nextStep();
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          loading: false,
          registerParentError: error.response.data.errorMessage
        });
      });
  };

  render() {
    const { step } = this.state;
    const { firstName, lastName, email, occupation, city, bio } = this.state;
    const values = { firstName, lastName, email, occupation, city, bio };

    switch (step) {
      case 1:
        return (
          <RegisterParent
            nextStep={this.nextStep}
            registerParent={this.registerParent}
            updateParent={this.updateParent}
            registerParentError={this.state.registerParentError}
            handleChange={this.handleChange}
            values={this.state.registerParent}
            loading={this.state.loading}
          />
        );
      case 2:
        return (
          <RegisterChild
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            registerChildValues={this.registerChildValues}
            values={this.state.registerChildValues}
          />
        );
      case 3:
        return (
          <EnrollChild
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            parentId={this.state.parentId}
            props={this.props}
            values={values}
          />
        );
      case 4:
        return null;
      default:
        return <div>Loading...</div>;
    }
  }
}

export default UserForm;
