import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Skeleton, Card, Modal, Button, Avatar } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getUserDetail, deleteUser } from '../../actions/users';
import TeacherUpdate from './TeacherUpdate';
const { confirm } = Modal;
const { Meta } = Card;

class TeacherDetails extends Component {

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getTeacherDetail(this.props.token, this.props.match.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getTeacherDetail(newProps.token, this.props.match.params.id);
      }
    }
  }


  showConfirmDelete = () => {
    // e.preventDefault();
    confirm({
      title: 'Do you want to delete these school?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: () => {
        this.props.deleteTeacher(this.props.token, this.props.match.params.id);
        this.props.history.push("/teacher/all-teachers")
      },
      onCancel() {},
    });
  }


  render() {
    const { currentTeacher } = this.props;
    const { id, first_name, last_name, username, email, is_school_admin, is_teacher, school, teachers } = currentTeacher;
    let teacher = null;
    try {
      teacher = teachers.map((v, k) => {
        return (
          <div key={k}>
            <p><strong>Street: </strong>{v.street}</p>
          </div>
        )
      });  
    } catch (error) {
      
    }

    return (
      <div>
        {
        // (is_school_admin == true && school == this.props.schoolId) || (is_teacher == true && school == this.props.schoolId) ?
        // {(is_school_admin == true && school == this.props.schoolId) || (is_teacher == true && school == this.props.schoolId) ?
          this.props.is_system_admin || this.props.is_school_admin || (this.props.is_school_admin && this.props.userId == this.props.match.params.id) || (this.props.is_teacher && this.props.userId == this.props.match.params.id) && Object.keys(currentTeacher).length > 0 ? (
          <div className="m-auto mt-5">
            {this.props.loading ? (
              <Skeleton active />
            ) : (
                <Card
                  // title={[first_name, " ", last_name]}
                  extra={
                    <div>
                      <Link to={`/teacher/${id}/update`}><Button type="primary">
                        Edit
                      </Button></Link>
                      <Button type="danger"  onClick={this.showConfirmDelete}>
                        Delete
                      </Button>
                    </div>
                  }
                  style={{ width: "100%" }}>
                  <Meta
                      avatar={<Avatar src="/static/assets/img/figure/teacher.jpg" />}
                      title={[first_name, " ", last_name]}
                    // title={[item.first_name, " ", item.last_name]}
                    // description="This is the description"
                  />
                  <br />
                {/* <p><strong>First Name: </strong>{first_name}</p>
                <p><strong>Last Name: </strong>{last_name}</p> */}
                <p><strong>Username: </strong>{username}</p>
                <p><strong>Email: </strong>{email}</p>
                {teacher}
              </Card>
            )}
          </div>
          ) : null
                // : null
        }
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    is_system_admin: state.auth.is_system_admin,
    is_school_admin: state.auth.is_school_admin,
    is_teacher: state.auth.is_teacher,
    schoolId: state.auth.schoolId,
    currentTeacher: state.users.currentUser,
    loading: state.users.loading,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTeacher: (token, id) => dispatch(deleteUser(token, id)),
    getTeacherDetail: (token, id) => dispatch(getUserDetail(token, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDetails);
