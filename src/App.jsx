/* eslint-disable no-constant-condition */
import React, { useEffect } from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blueGrey';
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
          <Switch>
            <Route path="/list">
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
              <Route path="/">
                <Header />
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
