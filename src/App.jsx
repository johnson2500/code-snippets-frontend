import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Switch, Route, withRouter, useHistory } from "react-router-dom";
import "./firebase";
import Navigation from "./components/nav";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
// import Side from './components/sideNavigation/sideNavigation';

function App() {
  const history = useHistory();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const { uid, accessToken } = user;
        const { accessToken } = user;
        // ...
        document.cookie = accessToken;
        history.push("/dashboard/main");
      } else {
        // User is signed out
        // ...
        history.push("/");
        console.log("logged out");
      }
    });
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/dashboard/main">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <Navigation />
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

App.propTypes = {};

App.defaultProps = {
  dispatch: () => {},
  auth: {},
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default withRouter(connect(mapStateToProps)(App));
