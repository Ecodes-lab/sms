import React from "react";
import { Form, Input, Icon, Button, Select } from "antd";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom";
import * as actions from "../../actions/auth";
// import WrappedRegister from "../accounts/Register"

const FormItem = Form.Item;
const Option = Select.Option;

class Register extends React.Component {
  state = {
    confirmDirty: false,
    // is_teacher: false,
    // is_school_admin: false/
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_student = false;
        let is_teacher = false;
        let is_school_admin = false;
        if (values.userType === "teacher") {
          is_teacher = true;
          is_student = false;
          is_school_admin = false;
        }
        else if (values.userType === "student") {
          is_student = true;
          is_teacher = false;
          is_school_admin = false;
        }
        else if (values.userType === "schooladmin") {
          is_school_admin = true;
          is_student = false;
          is_teacher = false;
        }        

        this.props.onAuth(
          values.firstName,
          values.lastName,
          values.userName,
          values.email,
          values.password,
          values.confirm,
          is_student,
          is_teacher,
          is_school_admin

        );
        // this.props.history.push("/");
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2>Teacher Registration</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("firstName", {
                rules: [{ required: true, message: "Please input your first name!" }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="First Name"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("lastName", {
                rules: [{ required: true, message: "Please input your last name!" }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Last Name"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator("userName", {
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
              {getFieldDecorator("password", {
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
              {getFieldDecorator("confirm", {
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
              {getFieldDecorator("userType", {
                rules: [
                  {
                    required: true,
                    message: "Please select a user!"
                  }
                ]
              })(
                <Select placeholder="Select a user type">
                  <Option value="schooladmin">School Admin</Option>
                  <Option value="teacher">Teacher</Option>
                  <Option value="student">Student</Option>
                </Select>
              )}
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Register Teacher
              </Button>
              {/* Or
              <NavLink style={{ marginRight: "10px" }} to="/login/">
                login
              </NavLink> */}
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedRegister = Form.create()(Register);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (first_name, last_name, username, email, password1, password2, is_student, is_teacher, is_school_admin) =>
      dispatch(
        actions.authRegister(first_name, last_name, username, email, password1, password2, is_student, is_teacher, is_school_admin)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegister);
