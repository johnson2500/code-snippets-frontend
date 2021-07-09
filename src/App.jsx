/* eslint-disable no-constant-condition */
import React, { useEffect } from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blueGrey';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import Header from './components/appbar/appBar';
import ListView from './pages/listView/listView';
import DrawerNav from './components/drawerNav/drawerNav';
import PromoPage from './pages/promoPage/propPage';
import SnippetEditor from './components/snippetViewer/snippetViewr';
import { makeRequest } from './helpers';
import EditPage from './pages/editPage/editPage';

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
    fontFamily: 'sans-serif',
  },
});

export const checkIsAuthenticated = (appState) => {
  const { auth } = appState;
  const { token } = auth;

  console.log(auth);

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
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // Your code here
        const token = localStorage.getItem('codeSnippetsToken');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
          try {
            const snippetResponse = await makeRequest({
              method: 'get',
              url: '/snippets',
              token,
            });

            console.log(snippetResponse);

            const snippets = snippetResponse.data;

            setAppState({
              ...appState,
              snippets,
              firebase,
              auth: {
                token,
                userId,
              },
            });
          } catch (error) {
            console.log(error.message);
          }
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
          <Switch>
            <Route path="/list">
              <DrawerNav setAppState={setAppState} appState={appState} />
            </Route>
            <Route path="/new">
              <DrawerNav setAppState={setAppState} appState={appState} />
            </Route>
            <Route exact path="/">
              <DrawerNav setAppState={setAppState} appState={appState} />
            </Route>
          </Switch>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path="/promo-page">
                <Header leftOffset={0} />
                <PromoPage />
              </Route>
              <Route path="/list">
                <Header />
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
              <Route path="/new">
                <Header />
                {
                  !isAuthenticated
                    ? (
                      <SignInUpModal
                        appState={appState}
                        setAppState={setAppState}
                      />
                    ) : (
                      <EditPage
                        appState={appState}
                        setAppState={setAppState}
                      />
                    )
                }
              </Route>
              <Route path="/">
                <Header />
                {
                  isAuthenticated
                    ? (
                      <Home
                        appState={appState}
                        setAppState={setAppState}
                      />
                    ) : (
                      <SignInUpModal
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
