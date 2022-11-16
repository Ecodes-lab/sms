import React, { Component } from 'react'
import { connect } from 'react-redux';

import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Header from './layout/Header';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';

import * as actions from "../actions/auth";



class Home extends Component {
  state = {
    scripts: []
  }

    
  componentWillMount() {
    this.state.scripts.push(
      { src: "/static/assets/js/main.js"},
    )
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    if(this.props.isAuthenticated) {

      this.state.scripts.map(item => {

        const script = document.createElement("script")
        script.src = item.src
        script.async = true
        document.body.appendChild(script)


      })
    }

    return (
      <div>
        <div id="preloader" />
        <div id="wrapper" className="wrapper" >
          <Header {...this.props} />
          <div className="dashboard-page">
            <Sidebar {...this.props} />
            
            <div className="dashboard-content">
              {this.props.children}
              <Footer {...this.props} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // componentDidUnmount() {
  //   if (this.props.user.token === null){

  //   }
  // }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    logout: () => dispatch(actions.logout())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
