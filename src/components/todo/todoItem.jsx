/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeRequest } from '../../helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '90vh',
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

export default function ListItemLink(props) {
  const classes = useStyles();
  const {
    todoItem, setListState, listState = [], appState, setAppState,
  } = props;

  const { auth } = appState;
  const { token } = auth;

  const { todo, checked, id } = todoItem;

  const [checkedState, setChecked] = useState(checked);

  const handleChange = () => {
    setChecked(!checkedState);
  };

  const handleDelete = () => {
    const filteredList = listState.filter((listItem) => listItem.id !== id) || [];
    setListState(filteredList);

    makeRequest({
      method: 'delete',
      url: `/todo/${id}`,
      token,
    });

    setAppState({
      ...appState,
      todos: filteredList,
    });
  };

  const style = checkedState ? {
    'text-decoration': 'line-through',
  } : {};

  return (
    <ListItem
      button
      onClick={handleChange}
      className={classes.fullWidth}
    >
      <Checkbox
        checked={checkedState}
        color="primary"
      />
      <ListItemText style={style}>{todo}</ListItemText>
      <DeleteIcon color="error" onClick={handleDelete} />
    </ListItem>
  );
}
