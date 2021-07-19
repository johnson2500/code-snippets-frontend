/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Todo from '../../components/todo/todo';
import ScratchPad from '../../components/scratchpad/scratchPad';

export default function Home(props) {
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
          <Todo
            setAppState={setAppState}
            appState={appState}
          />
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
