import React, { Component } from "react";
import axios from "axios";
import RegisterParent from "../../../customComponents/Child/AddChild/ParentNotFound/RegisterParent";
import RelationshipType from "./RelationshipType";

export class UserForm extends Component {
  state = {
    registerParent: {},
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

  /// for registering parent
  registerParent = (values, password) => {
    this.setState({ loading: true, registerParentError: "" });
    axios
      .post(
        `https://secret-brushlands-27116.herokuapp.com/api/users?password=${password}`,
        values
      )
      .then(res => {
        this.setState({ parentId: res.data.id, loading: false });
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

  /// for updating parent
  updateParent = (values, password) => {
    this.setState({ loading: true, registerParentError: "" });
    axios
      .put(
        `https://secret-brushlands-27116.herokuapp.com/api/users?password=${password}`,
        values
      )
      .then(res => {
        this.setState({ parentId: values.id, loading: false });
        // this.nextStep();
        window.location.reload();

        this.props.close();
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
            values={this.props.editParentData} // parents data for updating
            updateSignal={this.props.editParent} // signal for updating parent
            registerParentError={this.state.registerParentError}
            loading={this.state.loading}
          />
        );
      case 2:
        return (
          <RelationshipType
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            close={this.props.close}
            handleChange={this.handleChange}
            childId={this.props.childId}
            parentId={this.state.parentId}
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
