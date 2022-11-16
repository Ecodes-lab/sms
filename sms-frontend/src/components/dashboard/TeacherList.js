import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Grid, Skeleton, Card, Avatar, Modal, Button } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined, EyeOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import * as actions from "../../actions/users";
import TeacherUpdate from './TeacherUpdate';
import Hoc from "../../hoc/hoc";

const { Meta } = Card;

class TeacherList extends Component {

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getTeachers(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getTeachers(newProps.token);
      }
    }
  }

  handleDelete = (id) => {
    this.props.deleteTeacher(this.props.token, id)
  }


  renderItem(item) {
    return (
      <Hoc>
        {item.is_school_admin || item.is_teacher ?
        // {(item.is_school_admin && item.school == this.props.schoolId) || (item.is_teacher && item.school == this.props.schoolId) ?
          (

             <List.Item
               key={item.id}
             >
               <Card 
                 hoverable
                 // title={item.name}
                //  style={{ width: 200 }}
                //  cover={
                //    <img
                //      alt="Teacher"
                //      src="/static/assets/img/figure/teacher.jpg"
                //      width="100%"
                //      height="70"
                //    />
                //  }
                //  cover={
                //    <img
                //      alt="example"
                //      src={item.image}
                //    />
                //  }
                cover={
                  item.teachers.map((v, k) => { 
                    if (v.image !== null) {
                      return (
                        <img
                          style={{ height: 100 }}
                          key={k}
                          alt={item.username}
                          src={v.image}
                        />
                      )
                    }
                    else {
                     return (
                        <img style={{ height: 100 }} key={k} src="/static/assets/img/ECOLOGO.jpg" className="media-img-auto" alt={item.username} />
                      
                      )
                    }
                    })
                  }
                 actions={[
                   // <SettingOutlined key="setting" />,
                   <Link to={`/teacher/${item.id}`}><EyeOutlined key="view" /></Link>,
                   <Link to={`/teacher/${item.id}/update/`}><EditOutlined key="edit" /></Link>,
                   <DeleteOutlined key="delete" onClick={() => this.handleDelete(item.id)} />,
                 ]}
               >
                 <Meta
                   // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                   title={[item.first_name, " ", item.last_name]}
                   // description="This is the description"
                 />
               </Card>
               
             </List.Item>
          )
          :
          null
        }
      </Hoc>
    );

  }


  render() {
    return (
      <Hoc>
        {this.props.is_system_admin || this.props.is_school_admin ?
            this.props.loading ? (
              <Skeleton active />
            ) : (
              <div>
                <h3 style={{ margin: "16px 0" }}>Teacher List</h3>
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
                  dataSource={this.props.teachers}
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
    is_school_admin: state.auth.is_school_admin,
    is_teacher: state.auth.is_teacher,
    schoolId: state.auth.schoolId,
    teachers: state.users.users,
    loading: state.users.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTeacher: (token, id) => dispatch(actions.deleteUser(token, id)),
    getTeachers: token => dispatch(actions.getUsers(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherList);
