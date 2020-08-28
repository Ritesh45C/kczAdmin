import React, { useState, useEffect } from "react";
import {
  Dialog,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  IconButton,
  RadioGroup
} from "@material-ui/core";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function Start(props) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([]);

  const [value, setValue] = React.useState("");

  const handleChange = event => {
    setValue(event.target.value);
  };

  useEffect(() => {
    var token = localStorage.getItem("accessToken");
    if (!token) {
      props.history.push("/login");
    } else {
      const roles = localStorage.getItem("roles");
      const adminRoles = JSON.parse(roles).filter(a => a.role === "admin");
      setData(adminRoles);
      console.log(adminRoles[0]);
      console.log(JSON.parse(roles), "this is roles");
    }
  }, [props]);

  function handleSubmit(e, id) {
    e.preventDefault();
    if (!value) {
      alert("Please choose the Daycare");
    } else {
      localStorage.setItem("daycareId", value);
      props.history.push(`/programs/`);
      window.location.reload();
    }
  }

  // console.log(id, e);

  let dialog = null;
  if (data.length > 0) {
    var roles = data[0];
    dialog = (
      <div className="dialogBox">
        <FormControl component="fieldset">
          <div style={{ paddingBottom: "20px" }}>
            <FormLabel component="legend">Choose the daycare</FormLabel>
          </div>

          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value={roles.daycare.locationId}
              control={<Radio />}
              label={roles.daycare.unitName + ", " + roles.daycare.unitAddress}
            />
          </RadioGroup>
        </FormControl>
        <br />
        <div className="daycare">
          <IconButton color="primary" onClick={e => handleSubmit(e)}>
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>
    );
  }

  return (
    <Dialog className="model" fullWidth={true} open={open}>
      {dialog}
    </Dialog>
  );
}

export default Start;
