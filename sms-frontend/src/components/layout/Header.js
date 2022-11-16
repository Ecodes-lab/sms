import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from "../../actions/users";
// import { logout } from "../../actions/auth";
import Hoc from '../../hoc/hoc'

export class Header extends Component {
    
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
        this.props.getUsers(this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getUsers(newProps.token);
            }
        }
    }
    render() {
        const { isAuthenticated, logout, user } = this.props;
        // const { isAuthenticated, user } = this.props.auth;
        let userType;
        let profileLink = "";
        if (user.is_system_admin) {
            userType = "System Admin";
            profileLink = `/profile/a/${user.userId}`
        }
        else if (user.is_school_admin) {
            userType = "School Admin";
            profileLink = `/profile/t/${user.userId}`
        }
        else if (user.is_teacher) {
            userType = "Teacher";
            profileLink = `/profile/t/${user.userId}`
        }
        else if (user.is_student) {
            userType = "Student";
            profileLink = `/profile/s/${user.userId}`
        }

        const authLinks = (
            <div className="navbar navbar-expand-md header-menu-one bg-light">
                <div className="nav-bar-header-one">
                    <div className="header-logo">
                        <Link to="/">
                            <img src="/static/assets/img/logo.png" alt="logo" />
                        </Link>
                    </div>
                    <div className="toggle-button sidebar-toggle">
                        <button type="button" className="item-link">
                            <span className="btn-icon-wrap">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="d-md-none mobile-nav-bar">
                    <button className="navbar-toggler pulse-animation" type="button" data-toggle="collapse" data-target="#mobile-navbar" aria-expanded="false">
                        <i className="far fa-arrow-alt-circle-down"></i>
                    </button>
                    <button type="button" className="navbar-toggler sidebar-toggle-mobile">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>
                <div className="header-main-menu collapse navbar-collapse" id="mobile-navbar">
                    <ul className="navbar-nav">
                        <li className="navbar-item header-search-bar">
                            <div className="input-group stylish-input-group">
                                <span className="input-group-addon">
                                    <button type="submit">
                                        <span className="flaticon-search" aria-hidden="true"></span>
                                    </button>
                                </span>
                                <input type="text" className="form-control" placeholder="Find Something . . ." />
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="navbar-item dropdown header-admin">
                            <a className="navbar-nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                                aria-expanded="false">
                                <div className="admin-title">
                                    <h5 className="item-title">{user.first_name} {user.last_name}</h5>
                                    <span>{userType}</span>
                                </div>
                                <div className="admin-img">
                                    <img src="/static/assets/img/figure/admin.jpg" alt="Admin" />
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="item-header">
                                    <h6 className="item-title">{user.first_name} {user.last_name}</h6>
                                </div>
                                <div className="item-content">
                                    <ul className="settings-list">
                                        <li><Link to={profileLink}><i className="flaticon-user"></i>My Profile</Link></li>
                                        <li><a href="#"><i className="flaticon-list"></i>Task</a></li>
                                        <li><a href="#"><i className="flaticon-chat-comment-oval-speech-bubble-with-text-lines"></i>Message</a></li>
                                        <li><a href="#"><i className="flaticon-gear-loading"></i>Account Settings</a></li>
                                        <li>
                                            {/* <button
                                                onClick={this.props.logout}
                                                className="nav-link btn btn-info btn-sm text-light"
                                            >
                                                <i className="flaticon-turn-off"></i>
                                                Logout
                                            </button> */}
                                            <a onClick={logout} href="#"><i className="flaticon-turn-off"></i>Log Out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        {/* <li className="navbar-item dropdown header-message">
                            <a className="navbar-nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                                aria-expanded="false">
                                <i className="far fa-envelope"></i>
                                <div className="item-title d-md-none text-16 mg-l-10">Message</div>
                                <span>5</span>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="item-header">
                                    <h6 className="item-title">05 Message</h6>
                                </div>
                                <div className="item-content">
                                    <div className="media">
                                        <div className="item-img bg-skyblue author-online">
                                            <img src="/static/assets/img/figure/student11.png" alt="img" />
                                        </div>
                                        <div className="media-body space-sm">
                                            <div className="item-title">
                                                <a href="#">
                                                    <span className="item-name">Maria Zaman</span> 
                                                    <span className="item-time">18:30</span> 
                                                </a>  
                                            </div>
                                            <p>What is the reason of buy this item. 
                                            Is it usefull for me.....</p>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="item-img bg-yellow author-online">
                                            <img src="/static/assets/img/figure/student12.png" alt="img" />
                                        </div>
                                        <div className="media-body space-sm">
                                            <div className="item-title">
                                                <a href="#">
                                                    <span className="item-name">Benny Roy</span> 
                                                    <span className="item-time">10:35</span> 
                                                </a>  
                                            </div>
                                            <p>What is the reason of buy this item. 
                                            Is it usefull for me.....</p>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="item-img bg-pink">
                                            <img src="/static/assets/img/figure/student13.png" alt="img" />
                                        </div>
                                        <div className="media-body space-sm">
                                            <div className="item-title">
                                                <a href="#">
                                                    <span className="item-name">Steven</span> 
                                                    <span className="item-time">02:35</span> 
                                                </a>  
                                            </div>
                                            <p>What is the reason of buy this item. 
                                            Is it usefull for me.....</p>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="item-img bg-violet-blue">
                                            <img src="/static/assets/img/figure/student11.png" alt="img" />
                                        </div>
                                        <div className="media-body space-sm">
                                            <div className="item-title">
                                                <a href="#">
                                                    <span className="item-name">Joshep Joe</span> 
                                                    <span className="item-time">12:35</span> 
                                                </a>  
                                            </div>
                                            <p>What is the reason of buy this item. 
                                            Is it usefull for me.....</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li> */}
                        <li className="navbar-item dropdown header-notification">
                            <a className="navbar-nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                                aria-expanded="false">
                                <i className="far fa-bell"></i>
                                <div className="item-title d-md-none text-16 mg-l-10">Notification</div>
                                <span>8</span>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="item-header">
                                    <h6 className="item-title">03 Notifiacations</h6>
                                </div>
                                <div className="item-content">
                                    <div className="media">
                                        <div className="item-icon bg-skyblue">
                                            <i className="fas fa-check"></i>
                                        </div>
                                        <div className="media-body space-sm">
                                            <div className="post-title">Complete Your Registration</div>
                                            <span>1 Mins ago</span>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="item-icon bg-orange">
                                            <i className="fas fa-calendar-alt"></i>
                                        </div>
                                        <div className="media-body space-sm">
                                            <div className="post-title">Director Meeting</div>
                                            <span>20 Mins ago</span>
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="item-icon bg-violet-blue">
                                            <i className="fas fa-cogs"></i>
                                        </div>
                                        <div className="media-body space-sm">
                                            <div className="post-title">Update Password</div>
                                            <span>45 Mins ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="navbar-item dropdown header-language">
                            <a className="navbar-nav-link dropdown-toggle" href="#" role="button" 
                            data-toggle="dropdown" aria-expanded="false"><i className="fas fa-globe-americas"></i>EN</a>
                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#">English</a>
                                <a className="dropdown-item" href="#">Spanish</a>
                                <a className="dropdown-item" href="#">Franchis</a>
                                <a className="dropdown-item" href="#">Chiness</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
        );
    
        // const guestLinks = (
        //   <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        //     <li className="nav-item">
        //       <Link to="/register" className="nav-link">
        //         Register
        //       </Link>
        //     </li>
        //     <li className="nav-item">
        //       <Link to="/login" className="nav-link">
        //         Login
        //       </Link>
        //     </li>
        //   </ul>
        // );
        
    return ( 
      <div>
        {isAuthenticated ? authLinks : ''}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    users: state.users.users,
    loading: state.users.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: token => dispatch(actions.getUsers(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

