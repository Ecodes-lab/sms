import React, { Component } from 'react'

export default class StudentDashboard extends Component {
  render() {
    return (
      <div>
            <div className="breadcrumbs-area">
                <h3>Student Dashboard</h3>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>Student</li>
                </ul>
            </div>
            <div className="row">
                        
                <div className="col-8-xxxl col-12">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="dashboard-summery-one">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="item-icon bg-light-magenta">
                                            <i className="flaticon-shopping-list text-magenta"></i>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="item-content">
                                            <div className="item-title">Notification</div>
                                            <div className="item-number"><span className="counter" data-num="12">12</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="dashboard-summery-one">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="item-icon bg-light-blue">
                                            <i className="flaticon-calendar text-blue"></i>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="item-content">
                                            <div className="item-title">Events</div>
                                            <div className="item-number"><span className="counter" data-num="06">06</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="dashboard-summery-one">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="item-icon bg-light-yellow">
                                            <i className="flaticon-percentage-discount text-orange"></i>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="item-content">
                                            <div className="item-title">Attendance</div>
                                            <div className="item-number"><span className="counter" data-num="94">94</span><span>%</span></div>
                                        </div>
                                    </div>
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
