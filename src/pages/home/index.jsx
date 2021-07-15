/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Todo from '../../components/todo/todo';
import ScratchPad from '../../components/scratchpad/scratchPad';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: 300,
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const { appState, setAppState } = props;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <ScratchPad
            setAppState={setAppState}
            appState={appState}
          />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Todo
              setAppState={setAppState}
              appState={appState}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

Home.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
};

Home.defaultProps = {
  appState: {},
  setAppState: () => {},
};
