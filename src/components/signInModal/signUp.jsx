/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField, Typography, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: 20,
    maxWidth: '20%',
    minWidth: '20%',
  },
  fullWidth: {
    width: '100%',
  },
}));

export default function SignUp(props) {
  const { appState } = props;
  const { firebase } = appState;

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const [state, setState] = React.useState({
    email: null,
    password: null,
  });

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      password: value,
    });
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      email: value,
    });
  };

  const handleSubmit = () => {
    const { email, password } = state;
    // eslint-disable-next-line react/prop-types
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <>
      <Typography variant="h6" align="center">Sign Up</Typography>
      <br />
      <TextField
        type="email"
        label="Email"
        variant="outlined"
        onChange={handleEmailChange}
        className={classes.fullWidth}
      />
      <br />
      <br />
      <TextField
        type="password"
        variant="outlined"
        label="Password"
        onChange={handlePasswordChange}
        className={classes.fullWidth}
      />
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className={classes.fullWidth}
      >
        Sign Up
      </Button>
    </>
  );
}

SignUp.propTypes = {
  appState: PropTypes.object,
};

SignUp.defaultProps = {
  appState: {},
};
