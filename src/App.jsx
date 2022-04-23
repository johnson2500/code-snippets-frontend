import React from 'react';
import { connect } from 'react-redux';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './firebase';
import Navigation from './components/nav';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

App.propTypes = {
};

App.defaultProps = {
  dispatch: () => { },
  auth: {},
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(App);
