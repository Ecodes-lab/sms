import React from "react";
import {
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Hoc from "./hoc/hoc";


import Login from "./components/accounts/Login";

import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import TeacherRegister from "./components/dashboard/TeacherRegister";
import TeacherList from "./components/dashboard/TeacherList";
import TeacherDetails from "./components/dashboard/TeacherDetails";
import TeacherUpdate from "./components/dashboard/TeacherUpdate";

import StudentRegister from "./components/dashboard/StudentRegister";
import StudentList from "./components/dashboard/StudentList";
import StudentDetails from "./components/dashboard/StudentDetails";
import StudentUpdate from "./components/dashboard/StudentUpdate";

import SchoolCreate from "./components/dashboard/SchoolCreate";
import SchoolList from "./components/dashboard/SchoolList";
import SchoolDetails from "./components/dashboard/SchoolDetails";
import SchoolUpdate from "./components/dashboard/SchoolUpdate";

const BaseRouter = () => (
  
  <div>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        {/* <Route exact path="/" component={Dashboard} /> */}
        <Route exact path="/school/register-school" component={SchoolCreate} />
        <Route exact path="/school/all-schools" component={SchoolList} />
        <Route exact path="/school/:id/update" component={SchoolUpdate} />
        <Route exact path="/school/:id" component={SchoolDetails} />
      
        <Route exact path="/teacher/register-teacher" component={TeacherRegister} />
        <Route exact path="/teacher/all-teachers" component={TeacherList} />
        <Route exact path="/teacher/:id/update" component={TeacherUpdate} />
        <Route exact path="/teacher/:id" component={TeacherDetails} />
        
        <Route exact path="/student/register-student" component={StudentRegister} />
        <Route exact path="/student/all-students" component={StudentList} />
        <Route exact path="/student/:id/update" component={StudentUpdate} />
        <Route exact path="/student/:id" component={StudentDetails} />
        
        <Route exact path="/login" component={Login} />
      </Switch>
  </div>
);

export default BaseRouter;
