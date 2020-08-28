import React from "react";
import PropTypes from "prop-types";
import { Create, SaveButton, Toolbar, CardActions } from "react-admin/lib";
import PaymentForm from "./PaymentForm";
import CancelButton from "../../common/buttons/CancelButton";

export const PaymentCreateToolbar = props => (
  <Toolbar {...props}>
    <SaveButton label="Save" redirect="list" />
  </Toolbar>
);

export const PostEditActions = ({ basePath, ...props }) => (
  <CardActions>
    <CancelButton basePath={basePath} history={props.history} />
  </CardActions>
);

PostEditActions.propTypes = {
  basePath: PropTypes.string,
  history: PropTypes.object
};

const PaymentCreate = props => {
  return (
    <Create actions={<PostEditActions {...props} />} {...props}>
      <PaymentForm toolbar={<PaymentCreateToolbar label="Add" {...props} />} />
    </Create>
  );
};

PaymentCreate.propTypes = {
  permissions: PropTypes.string
};

export default PaymentCreate;
