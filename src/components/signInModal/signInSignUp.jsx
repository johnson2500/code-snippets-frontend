/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Card, CardContent, Divider, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import SignIn from './signIn';
import SignUp from './signUp';

const useStyles = makeStyles({
  root: {
    padding: 20,
    width: '20vw',
  },
  fullWidth: {
    width: '100%',
  },
  cardActions: {
    padding: 10,
  },
});

export default function SignInSignUp(props) {
  const classes = useStyles();
  const { setAppState, appState } = props;

  const [state, setState] = React.useState({
    signIn: true,
    signUp: false,
  });

  const handleChange = () => {
    const { signIn } = state;

    setState({
      ...state,
      signIn: !signIn,
    });
  };

  const { signIn } = state;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {
            signIn
              ? (
                <SignIn
                  appState={appState}
                  setAppState={setAppState}
                />
              ) : (
                <SignUp
                  appState={appState}
                  setAppState={setAppState}
                />
              )
        }
        <div className={classes.cardActions}>
          <Divider />
          <Typography>
            {
            signIn
              ? 'Not a member sign up.'
              : 'Already a member sign in.'
          }
          </Typography>
          <br />
          <Button
            size="small"
            onClick={handleChange}
            className={classes.fullWidth}
            color="primary"
            variant="contained"
          >
            {signIn ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

SignInSignUp.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
};

SignInSignUp.defaultProps = {
  appState: {},
  setAppState: () => {},
};
