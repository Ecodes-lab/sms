import React, { Component } from 'react'

export default class Social extends Component {
  render() {
    return (
      <div className="row gutters-20">
        <div className="col-lg-3 col-sm-6 col-12">
            <div className="card dashboard-card-seven">
                <div className="social-media bg-fb hover-fb">
                    <div className="media media-none--lg">
                        <div className="social-icon">
                            <i className="fab fa-facebook-f"></i>
                        </div>
                        <div className="media-body space-sm">
                            <h6 className="item-title">Like us on facebook</h6>
                        </div>
                    </div>
                    <div className="social-like">30,000</div>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
            <div className="card dashboard-card-seven">
                <div className="social-media bg-twitter hover-twitter">
                    <div className="media media-none--lg">
                            <div className="social-icon">
                            <i className="fab fa-twitter"></i>
                            </div>
                            <div className="media-body space-sm">
                                <h6 className="item-title">Follow us on twitter</h6>
                            </div>
                    </div>
                    <div className="social-like">1,11,000</div>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
            <div className="card dashboard-card-seven">
                <div className="social-media bg-gplus hover-gplus">
                    <div className="media media-none--lg">
                        <div className="social-icon">
                            <i className="fab fa-google-plus-g"></i>
                        </div>
                        <div className="media-body space-sm">
                            <h6 className="item-title">Follow us on googleplus</h6>
                        </div>
                    </div>
                    <div className="social-like">19,000</div>
                </div>
            </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          <div className="card dashboard-card-seven">
              <div className="social-media bg-linkedin hover-linked">
                  <div className="media media-none--lg">
                      <div className="social-icon">
                      <i className="fab fa-linkedin-in"></i>
                      </div>
                      <div className="media-body space-sm">
                          <h6 className="item-title">Follow us on linked</h6>
                      </div>
                  </div>
                  <div className="social-like">45,000</div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}
