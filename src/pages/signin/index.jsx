/* eslint-disable react/require-default-props */
import React from 'react';
import {
  Grid, Input, Typography, Button,
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
    <Grid>
      <Typography>Sign In</Typography>
      <Input type="email" placeholder="email" onChange={handleEmailChange} />
      <br />
      <Input type="email" placeholder="password" onChange={handlePasswordChange} />
      <br />
      <Button onClick={handleSubmit}>Sign In</Button>
    </Grid>
  );
}

SignIn.propTypes = {
  appState: {
    firebase: { auth: PropTypes.object },
  },
  setAppState: {},
};

SignIn.defaultProps = {
  setAppState: {},
  appState: {
    firebase: { auth: {} },
  },
};
