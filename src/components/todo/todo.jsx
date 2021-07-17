/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Typography, TextField, Divider } from '@material-ui/core';
import { makeRequest } from '../../helpers';
import ListItemLink from './todoItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll',
  },
  fullWidth: {
    width: '100% !important',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SimpleList(props) {
  const classes = useStyles();
  const { appState, setAppState } = props;

  const { todos, auth: { token } } = appState;

  const [listState, setListState] = useState(todos);

  const [todoItemState, setTodoItemState] = useState('');

  const handleAdd = async () => {
    const todoResponse = await makeRequest({
      url: '/todo',
      method: 'post',
      data: {
        todo: todoItemState,
      },
      token,
    });

    setListState([
      ...listState,
      { todo: todoItemState, checked: false, id: todoResponse },
    ]);

    setTodoItemState('');

    setAppState({
      ...appState,
      todos: listState,
    });
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <Typography variant="h5">Test</Typography>
        </ListItem>
        <IconButton
          onClick={handleAdd}
          type="submit"
          className={classes.iconButton}
          aria-label="add"
        >
          <AddIcon />
        </IconButton>
        <TextField
          className={classes.input}
          placeholder="Add Todo"
          style={{ width: '80%' }}
          onChange={(e) => setTodoItemState(e.target.value)}
        />
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        {
              listState.map((todoItem) => (
                <ListItemLink
                  key={todoItem.id}
                  todoItem={todoItem}
                  setListState={setListState}
                  listState={listState}
                  setAppState={setAppState}
                  appState={appState}
                />
              ))
          }
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  setAppState: PropTypes.func,
  appState: PropTypes.object,
  todos: PropTypes.array,
};

SimpleList.defaultProps = {
  setAppState: () => {},
  appState: {},
  todos: [],
};
