import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SET_AUTH_USER } from './redux/reducers/authReducers';
import Home from './pages/home';
import firebase from './firebase/index';
import SignInUpModal from './components/signInModal/signInModal';
import { makeRequest } from './helpers';
import SettingsPage from './pages/settings/settings';
import Loading from './pages/loading/loading';
import Todos from './pages/tasks/tasks';
import SideNavigation from './components/sideNavigation/sideNavigation';

const drawerWidth = 240;

const theme = createTheme({
});

export const checkIsAuthenticated = (auth) => {
  const { token } = auth;

  console.log(auth);

  return !!token;
};

function App(props) {
  const { dispatch, auth } = props;
  const [stateFound, setStateFound] = React.useState(false);

  const [tasksState, setTaskState] = React.useState([]);

  // component will mount
  useEffect(async () => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        const { uid: userId } = fbUser;
        const token = await firebase.auth().currentUser.getIdToken();

        localStorage.setItem('codeSnippetsToken', token);
        localStorage.setItem('userId', userId);

        if (token && userId) {
          try {
            const tasksPromise = makeRequest({
              method: 'get',
              url: '/tasks',
              token,
            });

            const [
              tasks,
            ] = await Promise.all([
              tasksPromise,
            ]);
            setTaskState(tasks.data);
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
          method: 'get',
          data: {
            userName: auth.userName,
            email: auth.email,
            ownerId: auth.userId,
          },
        });

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
  console.log('isAuthenticated', isAuthenticated);

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
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Permanent drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar>Nav</Toolbar>
            <Divider />
            <SideNavigation />
          </Drawer>
          <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
            <Toolbar />
            <Switch>
              <Route exact path="/settings">
                <SettingsPage />
              </Route>
              <Route exact path="/tasks">
                <Todos tasks={tasksState} />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object,
  dispatch: PropTypes.func,
};

App.defaultProps = {
  dispatch: () => { },
  auth: {},
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(App);
