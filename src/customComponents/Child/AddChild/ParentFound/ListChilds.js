import React, { useState } from "react";
import { MenuItem, Select, InputLabel, Button } from "@material-ui/core";
import RegisterChild from "../ParentNotFound/RegisterChild";

export default function ListChilds(props) {
  const [child, setChild] = useState();
  const [selectChild, setSelectChild] = useState([]);
  const [show, setShow] = useState(false);

  const handleChild = e => {
    setChild(e.target.value);
    //storing childId for enrolling
    localStorage.setItem("childId", e.target.value);
    var selectChild = props.childs.filter(child => child.id === e.target.value);
    setSelectChild(selectChild);
    setShow(false);
  };

  // select the child
  let childSelect;
  let showDetails;
  if (props.childs.length > 0) {
    childSelect = (
      <div className="listChild">
        <InputLabel htmlFor="age-simple"> Select Child</InputLabel>

        <Select value={child} onChange={handleChild}>
          {props.childs.map(program => {
            return (
              <MenuItem value={program.id}>
                {program.firstName} {program.lastName}
              </MenuItem>
            );
          })}
        </Select>

        <br />
        <Button
          onClick={() => setShow(!show)}
          variant="contained"
          color="primary"
        >
          Show Child Details
        </Button>
      </div>
    );
  } else {
    childSelect = <h3>There are no childrens!. Please add a new one</h3>;
    showDetails = (
      <RegisterChild
        nextStep={props.nextStep}
        values={props.values}
        registerChildValues={props.registerChildValues}
      />
    );
  }

  // show child details

  if (show) {
    if (!selectChild[0]) {
      alert("Please select a child");
    } else {
      showDetails = (
        <RegisterChild
          nextStep={props.nextStep}
          updateProp="update"
          values={selectChild[0]}
          registerChildValues={props.registerChildValues}
        />
      );
    }
  }
  return (
    <div>
      {childSelect}

      {showDetails}
    </div>
  );
}
