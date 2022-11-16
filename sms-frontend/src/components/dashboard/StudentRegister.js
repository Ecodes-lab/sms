import React from "react";
import { Form, Input, Icon, Button, Select } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../actions/auth";
import { getSchools } from "../../actions/schools";
import { getUsers } from "../../actions/users";

const FormItem = Form.Item;
const Option = Select.Option;

class StudentRegister extends React.Component {
  state = {
    confirmDirty: false,
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getSchools(this.props.token);
      this.props.getUsers(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getSchools(newProps.token);
        this.props.getUsers(newProps.token);
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_student = true;
        let is_teacher = false;
        let is_school_admin = false;
        let is_system_admin = false;

        this.props.onAuth(
          values.first_name,
          values.last_name,
          values.username,
          values.email,
          values.password1,
          values.password2,
          values.school,
          is_student,
          is_teacher,
          is_school_admin,
          is_system_admin

        );
        // this.props.students.map((v, k) => {
        //   if (v.username == values.username) {
        //     this.props.history.push(`/student/${v.id}/update`);
        //   }
        // })
        this.props.history.push(`/student/all-students`);
      //  return <Redirect to="/student/all-students" />
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password1")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["password2"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { is_system_admin, is_school_admin, is_teacher } = this.props.isRole;

    let schools = this.props.schools.map((v, k) => {
      return (
        <Option key={v.id} value={v.id}>{v.name}</Option>
      )
    })

    return (
      <div className="col-md-6 m-auto">
        {is_system_admin || is_school_admin || is_teacher ?
          (

            <div className="card card-body mt-5">
              <h2>Student Registration</h2>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator("first_name", {
                    rules: [{ required: true, message: "Please input your first name!" }]
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                      placeholder="First Name"
                    />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator("last_name", {
                    rules: [{ required: true, message: "Please input your last name!" }]
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                      placeholder="Last Name"
                    />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator("username", {
                    rules: [{ required: true, message: "Please input your username!" }]
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                      placeholder="Username"
                    />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!"
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
                      placeholder="Email"
                    />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator("password1", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator("password2", {
                    rules: [
                      {
                        required: true,
                        message: "Please confirm your password!"
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                      type="password"
                      placeholder="Password"
                      onBlur={this.handleConfirmBlur}
                    />
                  )}
                </FormItem>

                <FormItem>
                  { getFieldDecorator("school", {
                      rules: [
                        {
                          required: true,
                          message: "Please select a user!"
                        }
                      ]
                    })(
                      <Select placeholder="Select a school">
                        {schools}
                      </Select>
                      )
                  }
                </FormItem>

                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: "10px" }}
                  >
                    Register Student
                  </Button>
                  {/* Or
                  <NavLink style={{ marginRight: "10px" }} to="/login/">
                    login
                  </NavLink> */}
                </FormItem>
              </Form>
            </div>
          )
            :
            null
        }
      </div>
    );
  }
}

const WrappedStudentRegister = Form.create()(StudentRegister);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isRole: state.auth,
    schools: state.schools.schools,
    students: state.users.users,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSchools: token => dispatch(getSchools(token)),
    getUsers: token => dispatch(getUsers(token)),
    onAuth: (first_name, last_name, username, email, password1, password2, school, is_student, is_teacher, is_school_admin, is_system_admin) =>
      dispatch(
        actions.authRegister(first_name, last_name, username, email, password1, password2, school, is_student, is_teacher, is_school_admin, is_system_admin)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedStudentRegister);
