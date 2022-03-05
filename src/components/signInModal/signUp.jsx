/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField, Typography, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeRequest } from '../../helpers';
import store from '../../redux/store';
import { SET_AUTH_USER } from '../../redux/reducers/authReducers';

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
  errorMessage: {
    color: 'red',
  },
}));

export default function SignUp(props) {
  const { firebase } = props;

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  const [state, setState] = React.useState({
    email: null,
    password: null,
    confirmPassword: null,
    userName: null,
  });

  const [errorMessageState, setErrorMessageState] = React.useState();

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      password: value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      confirmPassword: value,
    });
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      email: value,
    });
  };

  const handleUserNameChange = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      userName: value,
    });
  };

  const handleSubmit = async () => {
    const { email, password, confirmPassword } = state;

    if (password !== confirmPassword) {
      console.log('Password not equal');

      setErrorMessageState('Passwords do not match.');
      return;
    }

    try {
      const existsRes = await makeRequest({
        url: `/user-name/exists?userName=${state.userName}`,
        method: 'get',
      });

      console.log(existsRes);

      if (!existsRes && !existsRes.data && existsRes.data.exists) {
        setErrorMessageState(`Username ${state.userName} already exists.`);
      }
    } catch (err) {
      console.log(err);
      setErrorMessageState(err.message);
      return;
    }

    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const token = await response.user.getIdToken();

      store.dispatch({
        type: SET_AUTH_USER,
        payload: {
          email: state.email,
          userName: state.userName,
          isNewUser: true,
          token,
        },
      });

      localStorage.setItem('codeSnippetsToken', token);
      localStorage.setItem('userId', state.userName);

      await makeRequest({
        url: '/user/initialize',
        method: 'post',
        data: {
          userName: state.userName,
          email: state.email,
        },
        token,
      });
    } catch (err) {
      console.log(err);
      setErrorMessageState(err.message);
    }
  };

  return (
    <>
      <Typography variant="h6" align="center">Sign Up</Typography>
      <br />
      <Typography variant="body1" className={classes.errorMessage}>{errorMessageState}</Typography>
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
      <TextField
        type="password"
        variant="outlined"
        label="Confirm Password"
        onChange={handleConfirmPasswordChange}
        className={classes.fullWidth}
      />
      <br />
      <br />
      {' '}
      <TextField
        type="text"
        variant="outlined"
        label="Username"
        onChange={handleUserNameChange}
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
  firebase: PropTypes.object,
};

SignUp.defaultProps = {
  firebase: {},
};
