/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// eslint-disable-next-line import/prefer-default-export
export const SignIn = (props) => {
  const { setErrorMsg } = props;
  const [emailAddressState, setEmailAddressState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const handlePasswordChange = (e) => {
    setPasswordState(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailAddressState(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailAddressState, passwordState)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user);

        user.getIdToken(true).then((idToken) => {
          document.cookie = `__session=${idToken};max-age=3600`;
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setErrorMsg(errorMessage);
      });
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={onSubmit}>
        Sign In
      </Button>
    </Form>
  );
};

SignIn.propTypes = {
  setErrorMsg: PropTypes.func,
};

SignIn.defaultProps = {
  setErrorMsg: () => {},
};
