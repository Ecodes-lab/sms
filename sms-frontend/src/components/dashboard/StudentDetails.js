import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Skeleton, Card, Modal, Button, Avatar } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getUserDetail, deleteUser } from '../../actions/users';
// import { getStudentDetail, deleteStudent } from '../../actions/students';
// import StudentUpdate from './StudentUpdate';


const { confirm } = Modal
const { Meta } = Card;

class StudentDetails extends Component {

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getStudentDetail(this.props.token, this.props.match.params.id );
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getStudentDetail(newProps.token, this.props.match.params.id );
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
        this.props.deleteStudent(this.props.token, this.props.match.params.id);
        this.props.history.push("/student/all-students")
      },
      onCancel() {},
    });
  }


  render() {
    const { currentStudent } = this.props;
    const { id, first_name, last_name, username, email, is_student, school, students } = currentStudent;
    // const { id, first_name, last_name, username, email, students } = currentStudent;
    let student = null;
    try {
      student = students.map((v, k) => {
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
        // is_student == true && school == this.props.schoolId ? 
          this.props.is_system_admin || this.props.is_school_admin || this.props.is_teacher || (this.props.is_student && this.props.userId == this.props.match.params.id) ? 
          Object.keys(currentStudent).length > 0 ? (
            <div className="m-auto mt-5">
              {this.props.loading ? (
                <Skeleton active />
              ) : (
                  <Card
                    // avatar={<Avatar src="/static/assets/img/figure/student.png" />}
                    // title={[first_name, " ", last_name]}
                    extra={
                      <div>
                        <Link to={`/student/${id}/update`}><Button type="primary">
                          Edit
                        </Button></Link>
                        <Button type="danger"  onClick={this.showConfirmDelete}>
                          Delete
                        </Button>
                      </div>
                    }
                    style={{ width: "100%" }}>
                  <Meta
                      avatar={<Avatar src="/static/assets/img/figure/student.png" />}
                      title={[first_name, " ", last_name]}
                    // title={[item.first_name, " ", item.last_name]}
                    // description="This is the description"
                    />
                    <br />
                  {/* <p><strong>First Name: </strong>{first_name}</p>
                  <p><strong>Last Name: </strong>{last_name}</p> */}
                  <p><strong>Username: </strong>{username}</p>
                  <p><strong>Email: </strong>{email}</p>
                  {student}
                </Card>
              )}
            </div>
          )
            :
            null
            :
            null
            // :
            // null
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
    is_student: state.auth.is_student,
    schoolId: state.auth.schoolId,
    currentStudent: state.users.currentUser,
    loading: state.users.loading,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteStudent: (token, id) => dispatch(deleteUser(token, id)),
    getStudentDetail: (token, id) => dispatch(getUserDetail(token, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDetails);
