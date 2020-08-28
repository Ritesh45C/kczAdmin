import StaffList from "./StaffList";
import { ShowGuesser } from "react-admin";
import StaffCreate from "./StaffCreate";

import StaffIcon from "@material-ui/icons/SupervisorAccountRounded";

import StaffShow from "./StaffShow";
import StaffEdit from "./StaffEdit";
//import ProgramCreate from './ProgramCreate';
//import ProgramEdit from './ProgramEdit'
export default {
  create: StaffCreate,
  list: StaffList,
  edit: StaffEdit,
  show: StaffShow,
  icon: StaffIcon
};
