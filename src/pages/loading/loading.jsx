/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import LoadingIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles(() => ({
  paper: {
    position: 'absolute',
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Loading() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Modal open>
      <div style={modalStyle} className={classes.paper}>
        <LoadingIcon style={{ animation: `spin ${3}s linear infinite` }} />
      </div>
    </Modal>
  );
}
