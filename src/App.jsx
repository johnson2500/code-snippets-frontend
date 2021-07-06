import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CodeIcon from '@material-ui/icons/Code';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import DefaultState from './initialState';
import Home from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import firebase from './firebase/index';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
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
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  const [appState, setAppState] = React.useState({
    ...DefaultState,
    firebase,
  });

  // component will mount
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // Your code here
        const token = localStorage.getItem('codeSnippetsToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
          axios({
            method: 'get',
            url: `https://code-snippet-backend.herokuapp.com/snippets?userId=${userId}&token=${token}`,
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              const { data: snippets } = response;

              setAppState({
                ...appState,
                snippets,
                firebase,
                auth: {
                  token,
                  userId,
                },
              });
            })
            .catch((error) => {
              console.log('error', error);
            });
        }
      }
    });
  }, []);

  const { snippets } = appState;

  const snippetClickHandler = (snippet) => {
    setAppState({
      ...appState,
      editorSnippet: {
        ...snippet,
      },
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Typography content="center" className={classes.toolbar}>
          <CodeIcon />
        </Typography>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText primary="My Snippets" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {
            snippets.map((snippet) => (
              <ListItem
                button
                onClick={() => {
                  snippetClickHandler(snippet);
                  console.log(snippet);
                }}
              >
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText primary={snippet.title || 'Snippet'} />
              </ListItem>
            ))
          }
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
          <Switch>
            <Route path="/snippets">
              about
            </Route>
            <Route path="/users">
              users
            </Route>
            <Route path="/sign-in">
              <SignIn appState={appState} setAppState={setAppState} />
            </Route>
            <Route path="/sign-up">
              <SignUp appState={appState} setAppState={setAppState} />
            </Route>
            <Route path="/">
              <Home appState={appState} setAppState={setAppState} />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}
