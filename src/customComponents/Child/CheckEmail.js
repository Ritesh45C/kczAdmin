import React, { Component, useState } from "react";
import axios from "axios";
import green from "@material-ui/core/colors/green";

import setAuthToken from "../../core/DataProvider/setAuthToken";
import {
  TextField,
  Button,
  CircularProgress,
  withStyles
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ListChilds from "./AddChild/ParentFound/ListChilds";
import EnrollChild from "./AddChild/ParentNotFound/EnrollChild";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
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

function CheckEmail(props) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [child, setChild] = useState([]);
  const [childValues, setChildValues] = useState();
  const [parentId, setParentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setStep(step - 1);
  };
  const token = localStorage.getItem("accessToken");
  const checkParent = () => {
    setLoading(true);
    setAuthToken(token);
    if (!email) {
      setLoading(false);

      setError("Please enter a valid Email!");
    } else {
      axios
        .get(
          `https://secret-brushlands-27116.herokuapp.com/api/users/email/${email}`
        )
        .then(res => {
          localStorage.setItem("parentId", res.data.user.id);

          // setParentId(res.data.user.id);
          setChild(res.data.childs);
          nextStep();
        })
        .catch(err => {
          setLoading(false);

          setError("No Details Found! Redirecting to Register Parent...");
          setTimeout(() => {
            props.history.push("/childs/registerParent");
          }, 1500);
        });
    }
  };

  const registerChildValues = values => {
    setChildValues(values);
    console.log("fired");
  };

  switch (step) {
    case 1:
      return (
        <div>
          <h2>Enter Parent's Email</h2>
          <h3 style={{ color: "red" }}>{error}</h3>
          <div className="checkEmail">
            <TextField
              onChange={e => setEmail(e.target.value)}
              type="email"
              label="Parent's Email"
            />
            <div className={props.classes.wrapper}>
              <Button variant="fab" mini color="primary">
                <ArrowForwardIcon onClick={checkParent} />
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={props.classes.buttonProgress}
                />
              )}
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <ListChilds
          nextStep={nextStep}
          prevStep={prevStep}
          childs={child}
          values={childValues}
          registerChildValues={registerChildValues}
          // handleChange={this.handleChange}
        />
      );
    case 3:
      return (
        <EnrollChild
          parentId={parentId}
          nextStep={nextStep}
          prevStep={prevStep}
          props={props}
        />
      );
    case 4:
      return null;
    default:
      return <div>Loading...</div>;
  }
}

export default withStyles(styles)(CheckEmail);
