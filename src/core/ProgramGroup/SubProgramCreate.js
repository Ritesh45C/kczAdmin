import axios from "axios";
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import { withRouter } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

import { Create, Toolbar, CardActions } from "react-admin/lib";
import SubProgramForm from "./SubProgramForm";
import CancelButton from "../../common/buttons/CancelButton";
import setAuthToken from "../DataProvider/setAuthToken";

export const SubProgramCreateToolbar = props => {
  const token = localStorage.getItem("accessToken");

  const daycareId = localStorage.getItem("daycareId");
  setAuthToken(token);

  let id = props.history.location.pathname;
  id = id.replace(/[^\d.]/g, "");

  const values = props.recordLiveValues;

  const addSubprogram = () => {
    axios
      .post(
        `https://secret-brushlands-27116.herokuapp.com/api/daycare/${daycareId}/programgroups?programId=${id}`,
        values
      )
      .then(res => props.history.goBack())
      .catch(err => console.log(err));
  };
  return (
    <Toolbar {...props}>
      <div style={{ margin: "auto" }}>
        <Button color="primary" variant="contained" onClick={addSubprogram}>
          Add Sub-Program
        </Button>
      </div>
    </Toolbar>
  );
};

export const PostEditActions = ({ basePath, ...props }) => (
  <CardActions>
    <CancelButton basePath={basePath} history={props.history} />
  </CardActions>
);

PostEditActions.propTypes = {
  basePath: PropTypes.string,
  history: PropTypes.object
};

const SubProgramCreate = props => {
  return (
    <Create actions={<PostEditActions {...props} />} {...props}>
      <SubProgramForm
        toolbar={<SubProgramCreateToolbar label="Add" {...props} />}
      />
    </Create>
  );
};

SubProgramCreate.propTypes = {
  permissions: PropTypes.string
};
const mapStateToProps = state => ({
  recordLiveValues: getFormValues("record-form")(state)
});

export default connect(mapStateToProps)(withRouter(SubProgramCreate));
