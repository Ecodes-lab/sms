import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.loading) {
        return <Spinner animation="border" ></Spinner>;
      } else if (!auth.token) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   }
// }

export default connect(mapStateToProps)(PrivateRoute);
