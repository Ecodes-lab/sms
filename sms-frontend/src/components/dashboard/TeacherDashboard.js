import React, { Component } from 'react'

export default class TeacherDashboard extends Component {
  render() {
    return (
      <div>
        <div className="breadcrumbs-area">
            <h3>Teacher Dashboard</h3>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>Teachers</li>
            </ul>
        </div>
        <div className="row">
          <div className="col-12 col-4-xxxl">
              <div className="row">
                  <div className="col-6-xxxl col-lg-3 col-sm-6 col-12">
                      <div className="dashboard-summery-two">
                          <div className="item-icon bg-light-magenta">
                              <i className="flaticon-classmates text-magenta"></i>
                          </div>
                          <div className="item-content">
                              <div className="item-number"><span className="counter" data-num="35000">35,000</span></div>
                              <div className="item-title">Total Students</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-6-xxxl col-lg-3 col-sm-6 col-12">
                      <div className="dashboard-summery-two">
                          <div className="item-icon bg-light-blue">
                              <i className="flaticon-shopping-list text-blue"></i>
                          </div>
                          <div className="item-content">
                              <div className="item-number"><span className="counter" data-num="19050">19,050</span></div>
                              <div className="item-title">Total Exams</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-6-xxxl col-lg-3 col-sm-6 col-12">
                      <div className="dashboard-summery-two">
                          <div className="item-icon bg-light-yellow">
                              <i className="flaticon-mortarboard text-orange"></i>
                          </div>
                          <div className="item-content">
                              <div className="item-number"><span className="counter" data-num="23890">23,890</span></div>
                              <div className="item-title">Graduate Studes</div>
                          </div>
                      </div>
                  </div>
                  <div className="col-6-xxxl col-lg-3 col-sm-6 col-12">
                      <div className="dashboard-summery-two">
                          <div className="item-icon bg-light-red">
                              <i className="flaticon-money text-red"></i>
                          </div>
                          <div className="item-content">
                              <div className="item-number"><span>$</span><span className="counter" data-num="2102050">21,02,050</span></div>
                              <div className="item-title">Total Income</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
