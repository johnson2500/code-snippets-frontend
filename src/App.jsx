/* eslint-disable no-constant-condition */
import React, { useEffect } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { theme } from './AppStyles';

import DefaultState from './initialState';
import Home from './pages/home';
import firebase from './firebase/index';
import SignInUpModal from './components/signInModal/signInModal';
import Header from './components/appbar/appBar';
import ListView from './pages/listView/listView';
import DrawerNav from './components/sideNavigation/sideNavigation';
import PromoPage from './pages/promoPage/propPage';
import { makeRequest } from './helpers';
import EditSnippet from './pages/newSnippet/newSnippet';
import SettingsPage from './pages/settings/settings';
import ViewSnippet from './pages/viewSnippet/viewSnippet';
import ViewNote from './pages/viewNote/viewNote';
import EditNote from './pages/newNote/newNote';

const drawerWidth = 200;

const useStyles = makeStyles(() => ({
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

export const checkIsAuthenticated = (appState) => {
  const { auth: { token } } = appState;

  return !!token;
};

const getNotes = async function () {

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
        const { uid: userId } = user;
        const token = await firebase.auth().currentUser.getIdToken();

        console.log('in');

        console.log(userId);
        console.log(token);

        localStorage.setItem('codeSnippetsToken', token);
        localStorage.setItem('userId', userId);

        if (token && userId) {
          try {
            const snippetResponse = await makeRequest({
              method: 'get',
              url: '/snippets',
              token,
            });

            const snippets = snippetResponse.data;

            const notesResponse = await makeRequest({
              method: 'get',
              url: '/notes',
              token,
            });

            const notes = notesResponse.data;

            setAppState({
              ...appState,
              snippets,
              notes,
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
      } else {
        localStorage.removeItem('codeSnippetsToken');
        localStorage.removeItem('userId');

        setAppState({
          ...appState,
          firebase,
          auth: {
            token: null,
            userId: null,
          },
        });
        console.log('NO USER');
      }
    });
  }, []);

  const isAuthenticated = checkIsAuthenticated(appState);

  if (!isAuthenticated) {
    return (
      <SignInUpModal
        appState={appState}
        setAppState={setAppState}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Switch>
            <Route exact path={['/list', '/', '/new-snippet', '/settings', '/view-snippet', '/new-note', '/view-note']}>
              <Header />
              <DrawerNav setAppState={setAppState} appState={appState} />
            </Route>
          </Switch>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/promo-page">
                <Header leftOffset={0} />
                <PromoPage />
              </Route>
              <Route exact path="/settings">
                <SettingsPage
                  appState={appState}
                  setAppState={setAppState}
                  settings={appState.settings}
                />
              </Route>
              <Route exact path="/list">
                <ListView
                  appState={appState}
                  setAppState={setAppState}
                />
              </Route>
              <Route exact path="/new-snippet">
                <EditSnippet
                  appState={appState}
                  setAppState={setAppState}
                />
              </Route>
              <Route exact path="/view-snippet">
                <ViewSnippet
                  appState={appState}
                  setAppState={setAppState}
                />
              </Route>
              <Route exact path="/new-note">
                <EditNote
                  appState={appState}
                  setAppState={setAppState}
                />
              </Route>
              <Route exact path="/view-note">
                <ViewNote
                  appState={appState}
                  setAppState={setAppState}
                />
              </Route>
              <Route exact path="/">
                <Home
                  appState={appState}
                  setAppState={setAppState}
                />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}
