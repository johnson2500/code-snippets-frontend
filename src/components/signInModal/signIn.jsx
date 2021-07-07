/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import {
  Typography, Button, TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function SignIn(props) {
  const { appState, setAppState } = props;
  const { firebase } = appState;

  const history = useHistory();

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

  const handleSubmit = async () => {
    const { email, password } = state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // Signed in
        const { user } = userCredential;

        const token = await user.getIdToken();

        setAppState({
          ...appState,
          token,
          userId: user.uid,
        });

        localStorage.setItem('codeSnippetsToken', token);
        localStorage.setItem('userId', user.uid);

        history.push('/');
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
      <Typography>Sign In</Typography>
      <TextField
        type="email"
        placeholder="email"
        onChange={handleEmailChange}
      />
      <br />
      <TextField type="password" placeholder="password" onChange={handlePasswordChange} />
      <br />
      <Button onClick={handleSubmit}>Sign In</Button>
    </>
  );
}

SignIn.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
};

SignIn.defaultProps = {
  setAppState: {},
  appState: {
    firebase: { auth: {} },
  },
};
