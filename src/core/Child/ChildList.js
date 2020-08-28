import React from "react";
import {
  Datagrid,
  EditButton,
  ExportButton,
  List,
  Responsive,
  ShowButton,
  SimpleList,
  DateField,
  TextField
} from "react-admin";
import { downloadCSV } from "react-admin";
import jsonExport from "jsonexport";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const PostActions = ({
  basePath,
  currentSort,
  displayedFilters,
  filters,
  filterValues,
  onUnselectItems,
  resource,
  selectedIds,
  showFilter,
  checkin,
  maxResults,
  permanentFilter,

  total
}) => (
  <Toolbar>
    {filters &&
      React.cloneElement(filters, {
        resource,
        showFilter,
        displayedFilters,
        filterValues,
        context: "button"
      })}
    <Button color="primary" onClick={checkin}>
      Add Child
    </Button>
    <ExportButton
      disabled={total === 0}
      resource={resource}
      sort={currentSort}
      filter={{ ...filterValues, ...permanentFilter }}
      exporter={exporter}
      maxResults={maxResults}
    />
  </Toolbar>
);

const exporter = posts => {
  const postsForExport = posts.map(post => {
    console.log(post);
    // const { child, ...postForExport } = post; // omit backlinks and author
    const postForExport = {};
    postForExport.firstName = post.child.firstName; // add a field
    postForExport.lastName = post.child.lastName;
    postForExport.programName = post.program.programName;
    postForExport.programGroup = post.programGroup.groupName;
    postForExport.joiningDate = post.fromDate;
    postForExport.enrolledTil = post.toDate;
    postForExport.parentFirstName = post.parent.firstName; // add a field
    postForExport.parentLastName = post.parent.lastName;
    console.log(post, postForExport);
    return postForExport;
  });
  jsonExport(
    postsForExport,
    {
      headers: [
        "firstName",
        "lastName",
        "programName",
        "programGroup",
        "joiningDate",
        "enrolledTill",
        "parentFirstName",
        "parentLastName"
      ] // order fields in the export
    },
    (err, csv) => {
      downloadCSV(csv, "staff_attendances"); // download as 'posts.csv` file
    }
  );
};

const simpleMapper = record => record.firstName + " " + record.lastName;

const FullNameField = ({ record = {} }) => (
  <span>
    {record.child.firstName} {record.child.lastName}
  </span>
);
const ParentFullNameField = ({ record = {} }) => (
  <span>
    {record.parent.firstName} {record.parent.lastName}
  </span>
);
FullNameField.defaultProps = { label: "Name" };
ParentFullNameField.defaultProps = { label: "Parent Name" };
const ChildList = props => {
  const checkin = () => {
    console.log(props.history.push("/childs/addChild"));
  };

  return (
    <List {...props} actions={<PostActions checkin={checkin} />}>
      <Responsive
        small={<SimpleList primaryText={simpleMapper} />}
        medium={
          <Datagrid rowClick="show">
            <FullNameField source="lastName" />
            <TextField source="program.programName" label="Program Name" />
            <ParentFullNameField
              source="parent.firstName"
              label="Parent Name"
            />
            <DateField source="fromDate" label="Joining Date" />
            <DateField source="toDate" label="Enrolled Till" />
            <ShowButton />
          </Datagrid>
        }
      />
    </List>
  );
};

export default ChildList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import setAuthToken from "../api/setAuthToken";
// import { Resource, ListGuesser, fetchUtils } from "react-admin";
// import { List, Datagrid, TextField } from "react-admin";
// import NavigationIcon from "@material-ui/icons/Navigation";

// import { Link, withRouter } from "react-router-dom";
// import AddIcon from "@material-ui/icons/Add";

// import {
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Table,
//   TableHead,
//   Button,
//   Dialog
// } from "@material-ui/core";
// import AddProgram from "./addProgram";

// export default function Program(props) {
//   const [data, setData] = useState([]);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const id = props.match.params.id;
//     var token = localStorage.getItem("token");
//     localStorage.setItem("id", id);
//     if (!token) {
//       props.history.push("/login");
//     }

//     var realToken = `Bearer ${token}`;
//     // console.log(token, "this is token");
//     setAuthToken(realToken);
//     // DataProvider(GET_LIST, "programs", {
//     //   id: id
//     // });
//     axios
//       .get(
//         `https://secret-brushlands-27116.herokuapp.com/api/daycare/${id}/programs`
//       )
//       .then(res => setData(res.data))
//       .then(console.log(data))
//       .catch(err => console.log(err));
//   }, []);
//   let tableBody;
//   if (data !== "undefined" && data.length > 0) {
//     tableBody = (
//       <TableBody>
//         {data.map(row => (
//           <TableRow key={row.id}>
//             <TableCell component="th" scope="row">
//               {row.id}
//             </TableCell>
//             <TableCell align="right">
//               {" "}
//               <Link to={`/${row.id}`}>{row.programName}</Link>{" "}
//             </TableCell>
//             <TableCell align="right">{row.capacity}</TableCell>
//             <TableCell align="right">{row.description}</TableCell>
//             <TableCell align="right">{row.programFees}</TableCell>
//             <TableCell align="right">{row.programHours}</TableCell>
//             <TableCell align="right">{row.feesRevisionDate}</TableCell>
//             <TableCell align="right">{row.numberOfHours}</TableCell>
//             <TableCell align="right">{row.revenueCode}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     );
//   }

//   return (
//     <div className="programLayout">
//       <div className="buttonsGroup">
//         <div className="addGroup">
//           <Button
//             onClick={() => props.history.push("/add-program")}
//             variant="extendedFab"
//             aria-label="Delete"
//           >
//             <AddIcon /> &nbsp; Add Program
//           </Button>
//         </div>
//       </div>

//       <Paper>
//         <Table aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Id</TableCell>
//               <TableCell align="right">Program Name</TableCell>
//               <TableCell align="right">Capacity</TableCell>
//               <TableCell align="right">Description</TableCell>
//               <TableCell align="right">Program Fees</TableCell>
//               <TableCell align="right">Program Hours</TableCell>
//               <TableCell align="right"> Fees Revision Date</TableCell>
//               <TableCell align="right">No.of Hours</TableCell>
//               <TableCell align="right">Revenue Code</TableCell>
//             </TableRow>
//           </TableHead>
//           {tableBody}
//         </Table>
//       </Paper>
//     </div>
//   );
// }
