/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'scroll',
  },
}));

const todoListItems = [{
  label: 'cool',
  checked: false,
}, {
  label: 'cool',
  checked: false,
}, {
  label: 'cool',
  checked: false,
}, {
  label: 'cool',
  checked: false,
}, {
  label: 'cool',
  checked: false,
}, {
  label: 'cool',
  checked: false,
}, {
  label: 'cool',
  checked: false,
}, {
  label: 'cool',
  checked: false,
}, {
  label: 'cool',
  checked: false,
}];

function ListItemLink(props) {
  const [checked, setChecked] = React.useState(true);
  const { todoItem } = props;
  const { label } = todoItem;

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <ListItem
      button
      onClick={handleChange}
    >
      <Checkbox
        checked={checked}
        color="primary"
      />
      <ListItemText>{label}</ListItemText>
    </ListItem>
  );
}

ListItemLink.propTypes = {
  todoItem: PropTypes.object,
};

ListItem.defaultProps = {
  todoItem: PropTypes.object,
};

export default function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          Todo
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        {
              todoListItems.map((todoItem) => (
                <ListItemLink todoItem={todoItem} />
              ))
          }
      </List>
    </div>
  );
}
