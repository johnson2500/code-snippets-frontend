/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-constant-condition */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CodeIcon from '@material-ui/icons/Code';
import NewIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Note from '@material-ui/icons/Notes';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
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
  primaryBackground: {
    background: theme.palette.primary.dark,
  },
}));

export default function DrawerBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const { appState, setAppState } = props;

  const { snippets = [], home, notes = [] } = appState;

  const snippetClickHandler = (snippet) => {
    setAppState({
      ...appState,
      view: {
        snippet,
        editing: false,
      },
    });

    history.push('/view-snippet');
  };

  const noteClickHandler = (note) => {
    setAppState({
      ...appState,
      view: {
        editing: false,
        note,
      },
    });

    history.push('/view-note');
  };

  const handleNewSnippet = () => {
    setAppState({
      ...appState,
      home: {
        ...home,
        editing: true,
      },
      edit: {
        editing: true,
      },
      editorSnippet: DefaultState.editorSnippet,
    });

    history.push('/new-snippet');
  };

  const handleNewNote = () => {
    setAppState({
      ...appState,
    });

    history.push('/new-note');
  };

  const handleHomeClick = () => {
    history.push('/');
  };

  const handleListClick = () => {
    history.push('/list');
  };

  const [snippetCollaspeOpenState, setSnippetCollaspeOpenState] = React.useState(false);

  const handleSnipetListCollapse = () => {
    setSnippetCollaspeOpenState(!snippetCollaspeOpenState);
  };

  const [noteCollaspeOpenState, setNoteCollaspeOpenState] = React.useState(false);

  const handleNoteListCollapse = () => {
    setNoteCollaspeOpenState(!noteCollaspeOpenState);
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
        <ListItem button onClick={handleNewNote}>
          <ListItemText primary="New Note" />
          <NoteAddIcon />
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
      {/* ====== Colapse snippets ====================================================== */}
      <ListItem className={classes.primaryBackground} button onClick={handleSnipetListCollapse}>
        <ListItemText primary="My Snippets" />
        {snippetCollaspeOpenState ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={snippetCollaspeOpenState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          {
            snippets.map((snippet) => (
              <ListItem
                key={snippet.id}
                button
                onClick={() => {
                  snippetClickHandler(snippet);
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText primary={snippet.title || 'Snippet'} />
              </ListItem>
            ))
          }
        </List>
      </Collapse>
      {/* ====== Colapse snippets ====================================================== */}
      <Divider />
      {/* ====== Colapse snippets ====================================================== */}
      <ListItem className={classes.primaryBackground} button onClick={handleNoteListCollapse}>
        <ListItemText primary="My Notes" />
        {noteCollaspeOpenState ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={noteCollaspeOpenState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          {
            notes.map((note) => (
              <ListItem
                key={note.id}
                button
                onClick={() => {
                  noteClickHandler(note);
                }}
                className={classes.nested}
              >
                <ListItemIcon>
                  <Note />
                </ListItemIcon>
                <ListItemText primary={note.title || 'Note'} />
              </ListItem>
            ))
          }
        </List>
      </Collapse>
      {/* ====== Colapse snippets ====================================================== */}
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
