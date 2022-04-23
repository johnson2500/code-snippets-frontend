/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';

import { SignIn } from './signIn';
import { SignUp } from './signUp';

export const signUpWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const { user } = result;
      console.log('user', user);
      document.cookie = `__session=${token};max-age=3600`;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const { email } = error;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email, errorCode, errorMessage, credential);
      // ...
    });
};

export default function SignInSignUp() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState('Oh no');

  const AlertMessage = errorMsg ? (
    <Alert variant="danger" onClose={() => setErrorMsg('')} dismissible>
      {errorMsg}
    </Alert>
  ) : '';

  const signInSignUp = showSignIn
    ? <SignIn setErrorMsg={setErrorMsg} />
    : <SignUp setErrorMsg={setErrorMsg} />;

  return (
    <Container className="m-10">
      <Card style={{ width: '18rem', marginTop: '30%' }}>
        <Card.Body>
          <Card.Title>{showSignIn ? 'Sign In' : 'Sign Up'}</Card.Title>
          <Card.Text>
            {AlertMessage}
            {signInSignUp}
          </Card.Text>

          <Card.Footer className="col">
            <Stack direction="vertical" gap={3}>
              <Button variant="secondary" onClick={signUpWithGoogle}>
                <i className="bi bi-google primary" />
                {' '}
                {showSignIn ? 'Sign In' : 'Sign Up'}
                {' '}
                With Google
              </Button>
              <Button onClick={() => setShowSignIn(!showSignIn)}>Not a member sign up!</Button>
            </Stack>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Container>
  );
}

SignInSignUp.propTypes = {
};

SignInSignUp.defaultProps = {
  firebase: {},
};
