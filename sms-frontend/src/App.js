import React, { Component, Fragment } from "react";
// import './static/assets/js/modernizr-3.6.0.min.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'antd/dist/antd.css';
import "./App.css";
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { connect } from 'react-redux';

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Home from './components/Home';
import Alerts from "./components/layout/Alerts";

import * as actions from "./actions/auth";

import BaseRouter from "./routes"


// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    // store.dispatch(loadUser());
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <Home>
          <BaseRouter />
        </Home>
      </Router>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
// export default App