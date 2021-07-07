/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Card, CardContent, CardActions,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import SignIn from './signIn';
import SignUp from './signUp';

const useStyles = makeStyles({
  root: {

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
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={handleChange}
        >
          {signIn ? 'Sign Up' : 'Sign In'}

        </Button>
      </CardActions>
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
