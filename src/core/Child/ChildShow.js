import React, { useEffect, useState } from "react";
import axios from "axios";
import setAuthToken from "../DataProvider/setAuthToken";
import { Resource, ListGuesser, fetchUtils } from "react-admin";
import { List, Datagrid, TextField } from "react-admin";
import NavigationIcon from "@material-ui/icons/Navigation";
import EditIcon from "@material-ui/icons/Edit";
import { Drawer } from "@material-ui/core";
import RegisterChild from "../../customComponents/Child/AddChild/ParentNotFound/RegisterChild";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import AddIcon from "@material-ui/icons/Add";

import {
  TableBody,
  TableRow,
  Typography,
  TableCell,
  Paper,
  Table,
  TableHead,
  Button,
  Dialog
} from "@material-ui/core";
import AddGuardian from "./AddGuardian/Index";

export default function ChildShow(props) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [childopen, setChildOpen] = useState(false);
  const [childId, setChildId] = useState("");
  const [childInfo, setChildInfo] = useState();
  const [parentsId, setParentsId] = useState("");
  const [parentsData, setParentsData] = useState([]); //guardians data
  const [editParent, setEditParent] = useState();
  const [update, setUpdate] = useState(false); // updating parent prop

  useEffect(() => {
    const kidId = props.match.params.id;
    setChildId(kidId);
    var token = localStorage.getItem("accessToken");
    var daycareId = localStorage.getItem("daycareId");

    // console.log(token, "this is token");
    setAuthToken(token);
    // DataProvider(GET_LIST, "programs", {
    //   id: id
    // });
    axios
      .get(
        `https://secret-brushlands-27116.herokuapp.com/api/daycare/${daycareId}/childs/${kidId}`
      )
      .then(res => {
        setData(res.data);
        var parentId = res.data.map(a => a.parent.id);
        setParentsId(parentId[0]);
      })
      .catch(err => console.log(err));
    axios
      .get(
        `https://secret-brushlands-27116.herokuapp.com/api/daycare/${daycareId}/parentChildRelationship/${kidId}`
      )
      .then(res => {
        setParentsData(res.data);
        var childData = res.data.map(a => a.child);
        setChildInfo(childData[0]);
      })
      .catch();
  }, []);

  const closeDialog = () => {
    console.log("fired");
    setChildOpen(false);
    setOpen(false);
    // window.location.reload();
  };

  // Edit parent dialog
  const onEdit = data => {
    setEditParent(data);
    setUpdate(true);
    setOpen(true);
  };

  const addGuardian = () => {
    setEditParent(null);
    setUpdate(false);
    setOpen(true);
  };

  let tableBody;
  let programInfo;
  if (data !== "undefined" && data.length > 0) {
    var childData = data.map(a => a.child);

    tableBody = (
      <TableBody>
        <TableRow key={childData[0].id}>
          <TableCell align="right">
            {childData[0].firstName} {childData[0].lastName}
          </TableCell>

          <TableCell align="right">{childData[0].careCardNumber}</TableCell>
          <TableCell align="right">
            {new Date(childData[0].dateOfBirth).toLocaleDateString("en-US")}
          </TableCell>
          <TableCell align="right">{childData[0].doctorName}</TableCell>
          <TableCell align="right">{childData[0].gender}</TableCell>
          <TableCell align="right">{childData[0].languagesSpoken}</TableCell>
          <TableCell align="right">{childData[0].address}</TableCell>
          <TableCell align="right">{childData[0].doctorPhone}</TableCell>
        </TableRow>
      </TableBody>
    );
    programInfo = data.map(row => {
      return (
        <TableBody>
          <TableRow key={row.program.id}>
            <TableCell align="right">{row.program.programName}</TableCell>

            <TableCell align="right">{row.programGroup.groupName}</TableCell>

            <TableCell align="right">
              {new Date(row.fromDate).toLocaleDateString()}
            </TableCell>

            <TableCell align="right">
              {new Date(row.toDate).toLocaleDateString()}
            </TableCell>
            <hr />
          </TableRow>
        </TableBody>
      );
    });
  }
  let relationType;
  if (parentsData.length > 0) {
    relationType = parentsData.map(row => {
      return (
        <TableBody>
          <TableRow key={row.id}>
            <TableCell align="right">
              {row.parent.firstName} {row.parent.lastName}
            </TableCell>
            <TableCell align="right">{row.relationshipType}</TableCell>
            <TableCell align="right">{row.parent.email}</TableCell>
            <TableCell align="right">
              {new Date(row.parent.registrationDate).toLocaleDateString(
                "en-US"
              )}
            </TableCell>
            <TableCell align="right">{row.parent.workPhone}</TableCell>
            <TableCell align="right">{row.parent.homePhone}</TableCell>
            <TableCell align="right">{row.parent.cellPhone}</TableCell>
            <Button
              variant="text"
              color="primary"
              onClick={() => onEdit(row.parent)}
            >
              Edit
            </Button>
          </TableRow>
        </TableBody>
      );
    });
  }

  return (
    <div className="programLayout">
      <div className="buttonsGroup">
        <div className="addGroup">
          <Button
            onClick={() => setChildOpen(true)}
            variant="extendedFab"
            aria-label="Delete"
          >
            <EditIcon /> &nbsp; Edit Child Info
          </Button>
        </div>
      </div>
      <Paper>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Child Name</TableCell>
              <TableCell align="right">Care Card No.</TableCell>
              <TableCell align="right">Date Of Birth</TableCell>
              <TableCell align="right">Doctor Name</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right"> Languages Spoken</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Doctor Phone</TableCell>
            </TableRow>
          </TableHead>
          {tableBody}
        </Table>
      </Paper>
      <br />
      <div>
        <div>
          <div className="childShow_heading">Programs Child enrolled in</div>
          <Paper>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Program Name</TableCell>
                  <TableCell align="right">Program Group Name</TableCell>
                  <TableCell align="right">From Date</TableCell>
                  <TableCell align="right">To Date</TableCell>
                  {/* <TableCell align="right">Gender</TableCell>
              <TableCell align="right"> Languages Spoken</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Doctor Phone</TableCell> */}
                </TableRow>
              </TableHead>
              {programInfo}
            </Table>
          </Paper>
        </div>
        <div>
          <div className="childShow_heading">Parent Child Relationship</div>
          <div>
            <Button
              onClick={addGuardian}
              variant="extendedFab"
              aria-label="Delete"
            >
              <AddIcon /> &nbsp; Add Guardians
            </Button>
          </div>

          <br />
          <Paper>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Parent Name</TableCell>
                  <TableCell align="right"> Relationship Type</TableCell>
                  <TableCell align="right"> Email</TableCell>
                  <TableCell align="right">Registration Date</TableCell>
                  <TableCell align="right">Work Phone</TableCell>
                  <TableCell align="right">Home Phone</TableCell>
                  <TableCell align="right"> Cell Phone</TableCell>
                </TableRow>
              </TableHead>
              {relationType}
            </Table>
          </Paper>
        </div>
      </div>
      <Dialog
        className="model"
        fullWidth={true}
        onClose={() => setOpen(false)}
        open={open}
      >
        <AddGuardian
          close={closeDialog}
          editParent={update}
          childId={childId}
          editParentData={editParent}
        />
      </Dialog>
      <Dialog
        className="model"
        fullWidth={true}
        onClose={() => setChildOpen(false)}
        open={childopen}
      >
        <RegisterChild
          editChild="editChild"
          close={closeDialog}
          values={childInfo}
        />
      </Dialog>
      {props.match.pathname === "/home" ? <RegisterChild /> : null}
    </div>
  );
}
