/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Todo from '../../components/todo/todo';
import ScratchPad from '../../components/scratchpad/scratchPad';

function Home(props) {
  const {
    scratchPad, auth, todos = {},
  } = props;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <ScratchPad
            scratchPad={scratchPad}
            auth={auth}
          />
        </Grid>
        <Grid item xs={6}>
          <Todo
            todos={todos.todos}
            auth={auth}
          />
        </Grid>
      </Grid>
    </>
  );
}

Home.propTypes = {
  scratchPad: PropTypes.object,
  auth: PropTypes.object,
  todos: PropTypes.object,
};

Home.defaultProps = {
  scratchPad: {},
  auth: {},
  todos: {},
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(Home);
