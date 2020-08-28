import React from "react";
import { Admin, Resource } from "react-admin";
import AuthProvider from "../AuthProvider";
import DataProvider from "../DataProvider/MyDataProvider";
import Programs from "../Programs";
import Staff from "../Staff";
import Child from "../Child";
import MyLayout from "../../UI/Layout";
import AttendanceList from "../Staff/StaffAttendance/AttendanceList";
import SubPrograms from "../ProgramGroup";
import customRoutes from "../../customComponents/customRoutes/customRoutes";
import Payments from "../Payments";
const myDataProvider = DataProvider;

const Dashboard = props => {
  return (
    <Admin
      title="KCZ Admin"
      authProvider={AuthProvider}
      dataProvider={myDataProvider}
      appLayout={MyLayout}
      customRoutes={customRoutes}
    >
      <Resource name="programs" options={{ label: "Programs" }} {...Programs} />
      <Resource name={`programgroups`} {...SubPrograms} />
      <Resource name="childs" options={{ label: "Childs" }} {...Child} />
      <Resource name="staffs" options={{ label: "Staff" }} {...Staff} />
      <Resource name="staffattendances" list={AttendanceList} />
      <Resource name="payments" {...Payments} />
    </Admin>
  );
};

export default Dashboard;
