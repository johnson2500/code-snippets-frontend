/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddButton from '@material-ui/icons/Add';
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from '@mui/material';
import { makeRequest } from '../../helpers';

export default function AddTask(props) {
  const { auth } = props;

  const [titleState, setTitleState] = React.useState('');

  const addTask = () => {
    makeRequest({
      method: 'post',
      url: '/task',
      data: {
        title: titleState,
      },
      token: auth.token,
    });
  };

  return (
    <Paper style={{ marginBottom: 10, paddingBottom: 10 }}>
      <Grid container>
        <Grid item xs={12}>
          <FormControl sx={{ width: 'calc(100% - 30px)', margin: 2 }}>
            <InputLabel htmlFor="add-task">Add Task</InputLabel>
            <Input
              id="add-task"
              onChange={(e) => setTitleState(e.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton onClick={addTask}>
                    <AddButton />
                  </IconButton>
                </InputAdornment>
            )}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}

AddTask.propTypes = {
  auth: PropTypes.object,
};

AddTask.defaultProps = {
  auth: {},
};
