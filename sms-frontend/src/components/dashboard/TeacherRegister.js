import React from "react";
import { Form, Input, Icon, Button, Select, Steps, message, Upload, Modal, Row, Col, DatePicker } from "antd";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom";
import * as actions from "../../actions/auth";
import { getSchools } from "../../actions/schools";
import TeachersForm from "./forms/TeachersForm"

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const Option = Select.Option;
const { Step } = Steps;

class TeacherRegister extends React.Component {
  // state = {
    // confirmDirty: false,
    // is_teacher: false,
    // is_school_admin: false/
  // };

  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      current: 0,
    };
  }

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

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_student = false;
        let is_teacher = false;
        let is_school_admin = false;
        let is_system_admin = false;
        if (values.userType === "teacher") {
          is_teacher = true;
          is_school_admin = false;
        }
        else if (values.userType === "schooladmin") {
          is_school_admin = true;
          is_teacher = false;
        } 
        // if (values.userType === "teacher") is_teacher = true;
        // {
        //   // is_teacher = true;
        //   this.setState({ is_teacher: true })
        // }
        // const teacher = {
        //   first_name:     values.first_name,
        //   last_name:      values.last_name,
        //   username:       values.username,
        //   email:          values.email,
        //   password1:      values.password1,
        //   password2:      values.password2,
        //   is_student:     is_student,
        //   is_teacher:     is_teacher,
        //   is_school_admin: is_school_admin,
        //   is_system_admin: is_system_admin,
        //   image:            values.image,
        //   date_of_birth:    values.date_of_birth,
        //   gender:           values.gender,
        //   street:           values.street,
        //   city:             values.city,
        //   state:            values.state,
        //   country:          values.country,
        //   zip_code:         values.zip_code,
        //   years_of_experience:    values.years_of_experience,
        //   academic_qualification: values.academic_qualification,
        //   phone:                  values.phone,
        //   emergency_contact1:     values.emergency_contact1,
        //   emergency_contact2:     values.emergency_contact2,
        //   blood_group:            values.blood_group,
        // }

        this.props.onAuth(
          // teacher
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
          is_system_admin,
          // values.image,
          // values.date_of_birth,
          // values.gender,
          // values.street,
          // values.city,
          // values.state,
          // values.country,
          // values.zip_code,
          // values.years_of_experience,
          // values.academic_qualification,
          // values.phone,
          // values.emergency_contact1,
          // values.emergency_contact2,
          // values.blood_group,
        );
        // this.props.onAuth(
        //   this.props.token,
        //   teacher
        // );
        // this.props.onAuth(
        //   values.firstName,
        //   values.lastName,
        //   values.userName,
        //   values.email,
        //   values.password,
        //   values.confirm,
        //   is_student,
        //   is_teacher,
        //   is_school_admin

        // );
        this.props.history.push("/teacher/all-teachers");
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

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { is_system_admin, is_school_admin } = this.props.isRole;

    // const steps = [
    //   {
    //     title: 'First',
    //     content: 'First-content',
    //   },
    //   {
    //     title: 'Second',
    //     content: 'Second-content',
    //   },
    //   {
    //     title: 'Last',
    //     content: 'Last-content',
    //   },
    // ];

    const { current } = this.state;

    let schools = this.props.schools.map((v, k) => {
        return (
          <Option key={v.id} value={v.id}>{v.name}</Option>
        )
      })


    return (
      <div>
        {/* <div>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </div> */}
        {
          is_system_admin || is_school_admin ?
            (
              <div>
                  <Form onSubmit={this.handleSubmit}>
                    <div className="col-md-6 m-auto card card-body mt-5">
                    <h2>Teacher Registration</h2>
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
                      { is_school_admin && !is_system_admin ?
                        (getFieldDecorator("userType", {
                        initialValue: "teacher",
                        rules: [
                          {
                            required: true,
                            message: "Please select a user!"
                          }
                        ]
                      })(
                        <Select placeholder="Select a user type">
                          <Option value="teacher">Teacher</Option>
                        </Select>
                        )) : 
                        (getFieldDecorator("userType", {
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
                          </Select>
                          ))
                      }
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
                    
                   </div> 
                  {/* <TeachersForm {...this.props} /> */}
                  
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

const WrappedTeacherRegister = Form.create()(TeacherRegister);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isRole: state.auth,
    loading: state.auth.loading,
    schools: state.schools.schools,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onAuth: (teacher) =>
    //   dispatch(
    //     actions.authTeacherRegister(teacher)
    //   )
    // onAuth: (first_name, last_name, username, email, password1, password2, is_student, is_teacher, is_school_admin, is_system_admin, image, date_of_birth, gender, street, city, state, country, zip_code, years_of_experience, academic_qualification, phone, emergency_contact1, emergency_contact2, blood_group) =>
    //   dispatch(
    //     actions.authTeacherRegister(first_name, last_name, username, email, password1, password2, is_student, is_teacher, is_school_admin, is_system_admin, image, date_of_birth, gender, street, city, state, country, zip_code, years_of_experience, academic_qualification, phone, emergency_contact1, emergency_contact2, blood_group)
    //   ),
    getSchools: token => dispatch(getSchools(token)),
    onAuth: (first_name, last_name, username, email, password1, password2, school, is_student, is_teacher, is_school_admin, is_system_admin) =>
      dispatch(
        actions.authRegister(first_name, last_name, username, email, password1, password2, school, is_student, is_teacher, is_school_admin, is_system_admin)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedTeacherRegister);
