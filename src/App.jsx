/* eslint-disable no-constant-condition */
import React, { useEffect } from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blueGrey';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import DefaultState from './initialState';
import Home from './pages/home';
import firebase from './firebase/index';
import SignInUpModal from './components/signInModal/signInModal';
import ListView from './pages/listView/listView';
import DrawerBar from './components/appbar/appBar';

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

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
  },
  typography: {
    fontSize: 12,
  },
});

export const checkIsAuthenticated = (appState) => {
  const { auth } = appState;
  const { token } = auth;

  return !!token;
};

export default function App() {
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
              const { data } = response;

              setAppState({
                ...appState,
                snippets: data,
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

  const isAuthenticated = checkIsAuthenticated(appState);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <DrawerBar setAppState={setAppState} appState={appState} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path="/discover">
                Discover
              </Route>
              <Route path="/teams">
                Teams
              </Route>
              <Route path="/list">
                {
                  !isAuthenticated
                    ? (
                      <SignInUpModal
                        appState={appState}
                        setAppState={setAppState}
                      />
                    ) : (
                      <ListView
                        appState={appState}
                        setAppState={setAppState}
                      />
                    )
                }
              </Route>
              <Route path="/">
                {
                  !isAuthenticated
                    ? (
                      <SignInUpModal
                        appState={appState}
                        setAppState={setAppState}
                      />
                    ) : (
                      <Home
                        appState={appState}
                        setAppState={setAppState}
                      />
                    )
                }
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}
