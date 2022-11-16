import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminDashboard from "./AdminDashboard"
import TeacherDashboard from "./TeacherDashboard"
import StudentDashboard from "./StudentDashboard"

class Dashboard extends Component {

  render() {

    const { is_system_admin, is_school_admin, is_teacher, is_student } = this.props.isRole
    if (is_system_admin) {
      return <AdminDashboard />
    } else if (is_school_admin || is_teacher) {
        return <TeacherDashboard />
    } else if (is_student) {
      return <StudentDashboard />
    }
  }
}

const mapStateToProps = state => {
  return {
    isRole: state.auth,
    token: state.auth.token,
    // teacher: state.teachers.teacher,
    // teacherId: state.teachers.userId,
    // loading: state.assignments.loading,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // getTeacher: (token, id) => dispatch(getTeacher(token, id)),
    // createGradedASNT: (token, asnt) => dispatch(createGradedASNT(token, asnt))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
