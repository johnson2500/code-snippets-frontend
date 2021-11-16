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
import { ADD_TODO } from '../../redux/reducers/todoReducers';
import store from '../../redux/store';

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

export default function Todo(props) {
  const classes = useStyles();
  const { todos = [], auth } = props;
  const { token } = auth;

  const [todoItemState, setTodoItemState] = useState('');

  const handleAdd = async () => {
    const todoResponse = await makeRequest({
      url: '/todo',
      method: 'post',
      data: {
        content: todoItemState,
      },
      token,
    });

    const todoItem = todoResponse.data;

    store.dispatch({
      type: ADD_TODO,
      payload: todoItem,
    });

    setTodoItemState('');
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
          value={todoItemState}
        />
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        {
              todos.map((todoItem) => (
                <ListItemLink
                  key={todoItem.id}
                  todoItem={todoItem}
                  auth={auth}
                />
              ))
          }
      </List>
    </div>
  );
}

Todo.propTypes = {
  todos: PropTypes.array,
  auth: PropTypes.object,
};

Todo.defaultProps = {
  todos: [],
  auth: {},
};
