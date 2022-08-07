/* eslint-disable operator-linebreak */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PropTypes from 'prop-types';

import { Switch, Route, withRouter, useHistory } from "react-router-dom";
import "./firebase";
import moment from "moment";
import Navigation from "./components/nav";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import SignUpNewUser from "./pages/signUpFlow/signUpFlow";
import { makeRequest, setCookie } from "./helpers";

function App(props) {
  const { dispatch } = props;
  const history = useHistory();
  const auth = getAuth();
  let counter = 0;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && counter === 0) {
        counter = 1;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const { accessToken } = user;
        const {
          stsTokenManager,
          metadata: { creationTime },
        } = user;
        const { expirationTime } = stsTokenManager;
        setCookie("fbToken", accessToken, new Date(expirationTime));

        dispatch({ type: "SET_AUTH", payload: { ...stsTokenManager } });

        const creationDate = moment(new Date(creationTime), "h:mm:ss");
        const isNewUser =
          Math.abs(creationDate.diff(Date.now(), "minutes")) < 30;
        makeRequest({ url: "/projects", token: accessToken })
          .then((repsonse) => repsonse.data)
          .then((data) => {
            dispatch({ type: "SET_PROJECTS", payload: data.data });
          });
        if (isNewUser) {
          history.push("/sign-up-new-user");
        } else {
          history.push("/dashboard/main");
        }
      } else {
        // history.push("/");
        document.cookie = "";
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
        <Route>
          <SignUpNewUser exact path="/sign-up-new-user" />
        </Route>
      </Switch>
    </div>
  );
}

App.propTypes = {
  dispatch: PropTypes.func,
};

App.defaultProps = {
  dispatch: () => {},
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default withRouter(connect(mapStateToProps)(App));
