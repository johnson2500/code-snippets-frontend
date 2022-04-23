/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

// eslint-disable-next-line import/prefer-default-export
export const SignUp = (props) => {
  const { setErrorMsg } = props;
  const [emailAddressState, setEmailAddressState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [confirmPasswordState, setConfirmPasswordState] = useState('');

  const handlePasswordChange = (e) => {
    setPasswordState(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordState(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailAddressState(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (passwordState !== confirmPasswordState) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailAddressState, passwordState)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
        user.getIdToken(true).then((idToken) => {
          document.cookie = `__session=${idToken};max-age=3600`;
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setErrorMsg(errorMessage);
        // ..
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

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={onSubmit}>
        Sign Up
      </Button>
    </Form>
  );
};

SignUp.propTypes = {
  setErrorMsg: PropTypes.func,
};

SignUp.defaultProps = {
  setErrorMsg: () => {},
};
