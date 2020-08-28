import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import IconCancel from '@material-ui/icons/Cancel';
import withStyles from '@material-ui/core/styles/withStyles';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const styles = {
  button: {
    margin: '10px 24px',
    position: 'relative',
  },
  iconPaddingStyle: {
    paddingRight: '0.5em',
  },
};

const onCancel = (basePath, history) => {
  confirmAlert({
    title: 'Confirm to Cancel',
    message: 'Your changes won\'t be saved.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {history.goBack();}
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
  });
};

const CancelButton = ({
  classes,
  label,
  basePath,
  history
}) => (
  <Button className={classes.button} onClick={() => onCancel(basePath, history)}>
    <IconCancel className={classes.iconPaddingStyle} />
    {label}
  </Button>
);

CancelButton.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  basePath: PropTypes.string,
  history:PropTypes.object
};

CancelButton.defaultProps = {
  label: 'Cancel',
};

export default withStyles(styles)(CancelButton);
