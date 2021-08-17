/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-constant-condition */
import React, { useEffect } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { theme } from './AppStyles';
import './App.css';

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
import Loading from './pages/loading/loading';
import FolderView from './pages/folderView/folderView';

import { SET_SNIPPETS } from './redux/reducers/snippetsReducers';
import { SET_NOTES } from './redux/reducers/notesReducers';
import { SET_SCRATCHPAD } from './redux/reducers/scratchPadReducers';
import { SET_TODOS } from './redux/reducers/todoReducers';
import { SET_AUTH_USER } from './redux/reducers/authReducers';

export const drawerWidth = 200;

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
  content: {
    flexGrow: 1,
  },
}));

export const checkIsAuthenticated = (auth) => {
  const { token } = auth;

  return !!token;
};

function App(props) {
  const { dispatch, auth } = props;
  console.log(auth);
  const classes = useStyles();

  const [appState, setAppState] = React.useState({
    ...DefaultState,
    firebase,
  });

  const [stateFound, setStateFound] = React.useState(false);

  // component will mount
  useEffect(async () => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        const { uid: userId } = fbUser;
        const token = await firebase.auth().currentUser.getIdToken();

        localStorage.setItem('codeSnippetsToken', token);
        localStorage.setItem('userId', userId);

        console.log('auth', auth);
        // is a new user

        if (token && userId) {
          try {
            const snippetPromise = makeRequest({
              method: 'get',
              url: '/snippets',
              token,
            });

            const notesPromise = makeRequest({
              method: 'get',
              url: '/notes',
              token,
            });

            const todosPromise = makeRequest({
              method: 'get',
              url: '/todos',
              token,
            });

            const scratchPadPromise = makeRequest({
              method: 'get',
              url: '/scratch-pad',
              token,
            });

            const [
              snippetResponse,
              notesResponse,
              todosResponse,
              scratchPadResponse,
            ] = await Promise.all([
              snippetPromise,
              notesPromise,
              todosPromise,
              scratchPadPromise,
            ]);

            dispatch({ type: SET_SNIPPETS, payload: snippetResponse.data });
            dispatch({ type: SET_NOTES, payload: notesResponse.data });
            dispatch({ type: SET_SCRATCHPAD, payload: scratchPadResponse.data });
            dispatch({ type: SET_TODOS, payload: todosResponse.data });
            dispatch({ type: SET_AUTH_USER, payload: { token, userId } });
          } catch (error) {
            console.log(error.message);
          }
        }
      } else {
        localStorage.removeItem('codeSnippetsToken');
        localStorage.removeItem('userId');

        dispatch({
          type: SET_AUTH_USER,
          payload: { token: null, userId: null },
        });
      }

      setStateFound(true);
    });
  }, []);

  useEffect(async () => {
    if (auth.isNewUser && auth.userId) {
      try {
        const appUser = await makeRequest({
          url: '/user',
          method: 'post',
          data: {
            userName: auth.userName,
            email: auth.email,
            ownerId: auth.userId,
          },
        });

        console.log('authUser', appUser);

        dispatch({
          type: SET_AUTH_USER,
          payload: appUser.data,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [auth.isNewUser, auth.userId]);

  const isAuthenticated = checkIsAuthenticated(auth);

  if (!stateFound) {
    return (
      <Loading />
    );
  }

  if (!isAuthenticated) {
    return (
      <SignInUpModal
        firebase={firebase}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <Switch>
            <Route path={['/list', '/', '/new-snippet', '/settings', '/view-snippet', '/new-note', '/view-note']}>
              <DrawerNav setAppState={setAppState} appState={appState} />
            </Route>
          </Switch>
          <main className={classes.content}>
            <Switch>
              <Route exact path="/promo-page">
                <Header leftOffset={0} />
                <PromoPage />
              </Route>
              <Route exact path="/folder-view">
                <FolderView />
              </Route>
              <Route exact path="/settings">
                <SettingsPage />
              </Route>
              <Route exact path="/list">
                <ListView />
              </Route>
              <Route exact path="/new-snippet">
                <EditSnippet />
              </Route>
              <Route exact path="/view-snippet">
                <ViewSnippet />
              </Route>
              <Route exact path="/new-note">
                <EditNote />
              </Route>
              <Route exact path="/view-note">
                <ViewNote />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}
App.propTypes = {
  auth: PropTypes.object,
  dispatch: PropTypes.func,
};

App.defaultProps = {
  dispatch: () => { },
  auth: {
  },
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(App);
