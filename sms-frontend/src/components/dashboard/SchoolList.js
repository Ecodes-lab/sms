import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Grid, Skeleton, Card, Avatar, Modal, Button } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined, EyeOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import * as actions from "../../actions/schools";
import SchoolUpdate from './SchoolUpdate';
import Hoc from "../../hoc/hoc";

const { Meta } = Card;

class SchoolList extends Component {

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getSchools(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getSchools(newProps.token);
      }
    }
  }

  handleDelete = (id) => {
    this.props.deleteSchool(this.props.token, id)
  }


  renderItem(item) {
    return (
      // <Link to={`/school/${item.id}`}>
        <List.Item
          key={item.id}
        >
          <Card 
            hoverable
            // title={item.name}
            // style={{ width: "100%" }}
          cover={
            item.logo !== null ? 
              (
                <img
                style={{ height: 100 }}
                alt="Logo"
                src={item.logo}
                />
              )
                :
              (
                <img style={{ height: 100 }} src="/static/assets/img/ECOLOGO.jpg" className="media-img-auto" alt="Logo" />
                
              )
            }
            actions={[
              // <SettingOutlined key="setting" />,
              <Link to={`/school/${item.id}`}><EyeOutlined key="view" /></Link>,
              <Link to={`/school/${item.id}/update/`}><EditOutlined key="edit" /></Link>,
              <DeleteOutlined key="delete" onClick={() => this.handleDelete(item.id)} />,
            ]}
          >
            <Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={item.name}
              // description="This is the description"
            />
          </Card>
          
        </List.Item>
      // </Link>
    );
  }


  render() {
    return (
      <Hoc>
        {this.props.is_system_admin ?
            this.props.loading ? (
              <Skeleton active />
            ) : (
              <div>
                <h3 style={{ margin: "16px 0" }}>School List</h3>
                <List
                  grid={{ 
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 4,
                    xl: 4,
                    xxl: 3, 
                    // column: 4,
                  }}
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 6,
                  }}
                  bordered
                  dataSource={this.props.schools}
                  renderItem={item => this.renderItem(item)}
                  />
              </div>
            )
           : null
        }
      </Hoc>
    )
  }
}


const mapStateToProps = state => {
  return {
    token: state.auth.token,
    is_system_admin: state.auth.is_system_admin,
    schools: state.schools.schools,
    loading: state.schools.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteSchool: (token, id) => dispatch(actions.deleteSchool(token, id)),
    getSchools: token => dispatch(actions.getSchools(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolList);
