/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-constant-condition */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import CodeIcon from '@material-ui/icons/Code';
import NewIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import PropTypes from 'prop-types';
import {
  useHistory,
} from 'react-router-dom';
import DefaultState from '../../initialState';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function DrawerBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const { appState, setAppState } = props;

  const { snippets, home } = appState;

  const snippetClickHandler = (snippet) => {
    setAppState({
      ...appState,
      editorSnippet: {
        ...snippet,
      },
      home: {
        ...home,
        editing: false,
      },
    });

    history.push('/');
  };

  const handleNewSnippet = () => {
    setAppState({
      ...appState,
      home: {
        ...home,
        editing: true,
      },
      editorSnippet: DefaultState.editorSnippet,
    });
  };

  const handleHomeClick = () => {
    history.push('/');
  };

  const handleListClick = () => {
    history.push('/list');
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <List>
        <ListItem button onClick={handleHomeClick}>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleNewSnippet}>
          <ListItemText primary="New Snippet" />
          <NewIcon />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleListClick}>
          <ListItemText primary="List View" />
          <ListIcon />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Typography variant="h5">My Snippets</Typography>
        </ListItem>
        {
            snippets.map((snippet) => (
              <ListItem
                key={snippet.id}
                button
                onClick={() => {
                  snippetClickHandler(snippet);
                }}
              >
                <ListItemText primary={snippet.title || 'Snippet'} />
                <ListItemIcon>
                  <Chip
                    icon={<CodeIcon />}
                    label={snippet.language}
                    variant="outlined"
                    className={classes.flexItem}
                  />
                </ListItemIcon>
              </ListItem>
            ))
          }
      </List>
    </Drawer>
  );
}

DrawerBar.propTypes = {
  appState: PropTypes.object,
  setAppState: PropTypes.func,
};

DrawerBar.defaultProps = {
  appState: {},
  setAppState: () => {},
};
