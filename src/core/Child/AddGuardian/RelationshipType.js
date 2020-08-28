import React, { useState } from "react";
import { Dialog, TextField, Button, FormHelperText } from "@material-ui/core";
import axios from "axios";
import setAuthToken from "../../DataProvider/setAuthToken";
export default function RelationshipType(props) {
  const [relation, setRelation] = useState("");
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");

  // Handle fields change
  const handleChange = input => e => {
    setRelation(e.target.value);
  };
  const addGuardian = () => {
    var daycareId = localStorage.getItem("daycareId");
    var token = localStorage.getItem("accessToken");

    var data = {
      childId: props.childId,
      parentId: props.parentId,
      relationshipType: relation
    };
    console.log(data);
    setOpen(false);
    setAuthToken(token);
    axios
      .post(
        `https://secret-brushlands-27116.herokuapp.com/api/daycare/${daycareId}/parentChildRelationship`,
        data
      )
      .then(res => {
        window.location.reload();
        props.close();
      })
      .catch(err => setError(err));
  };
  return (
    <div style={{ padding: "25px" }}>
      <div>
        <h3>Add Guardians For Child</h3>
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
        <TextField
          label="Relationship Type"
          type="text"
          name="relationshipType"
          onChange={handleChange("relationshipType")}
          margin="normal"
          variant="outlined"
        />
        <FormHelperText>Ex: Father,Mother...</FormHelperText>
      </div>
      <br />
      <Button onClick={addGuardian} color="primary" variant="contained">
        Add Guardian
      </Button>
    </div>
  );
}
