import React from 'react';
// import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function SignInModal() {
  return (
    <Grid item>
      <Link to="/sign-up">
        <Button variant="contained">
          Sign Up
        </Button>
      </Link>
      <Link to="/sign-in">
        <Button variant=" ">
          Sign In
        </Button>
      </Link>
    </Grid>
  );
}

SignInModal.propTypes = {
};
