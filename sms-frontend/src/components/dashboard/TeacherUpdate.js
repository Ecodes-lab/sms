import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Upload, Modal } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { updateUser, getUserDetail } from "../../actions/users";
import TeacherImageUpload from './forms/TeacherImageUpload';

const Option = Select.Option;



class TeacherUpdate extends Component {

  // state = {
  //   previewVisible: false,
  //   previewImage: '',
  //   fileList: {},
  // };
  state = {
    confirmDirty: false,
    // image: null
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getUserDetail(this.props.token, this.props.match.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getUserDetail(newProps.token, this.props.match.params.id);
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
        const teachers = [];
        // for (let i = 0; i < values.questions.length; i += 1) {
          teachers.push({
            image:            values.image,
            date_of_birth:    values.date_of_birth,
            gender:           values.gender,
            street:           values.street,
            city:             values.city,
            state:            values.state,
            country:          values.country,
            zip_code:         values.zip_code,
            years_of_experience:    values.years_of_experience,
            academic_qualification: values.academic_qualification,
            phone:                  values.phone,
            emergency_contact1:     values.emergency_contact1,
            emergency_contact2:     values.emergency_contact2,
            blood_group:            values.blood_group,
          });
        // }
      
        const user = {
          first_name:     values.first_name,
          last_name:      values.last_name,
          username:       values.username,
          email:          values.email,
          // password1:      values.password1,
          // password2:      values.password2,
          is_student:     is_student,
          is_teacher:     is_teacher,
          is_school_admin: is_school_admin,
          is_system_admin: is_system_admin,
          teachers,
          
        }
        this.props.updateUser(this.props.token, this.props.match.params.id, user);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  


  // getBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //   });
  // }
  
  // handleCancel = () => this.setState({ previewVisible: false });

  // handlePreview = file => {
  //   if (!file.url && !file.preview) {
  //     file.preview = getBase64(file.originFileObj);
  //   }

  //   this.setState({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true,
  //   });
  // };

  // handleChange = ({ fileList }) => this.setState({ fileList });




  render() {
    const { getFieldDecorator } = this.props.form;
    const { currentTeacher } = this.props;
    const { first_name, last_name, username, email, is_teacher, is_school_admin, is_system_admin, school, teachers } = currentTeacher;

    let is_role;

    if (is_school_admin) is_role = "schooladmin";
    else if (is_teacher) is_role = "teacher";


    return (
      <div>
        {
        // (is_school_admin == true && school == this.props.schoolId) || (is_teacher == true && school == this.props.schoolId) ?
          this.props.is_system_admin || this.props.is_school_admin || (this.props.is_school_admin  && this.props.userId == this.props.match.params.id) || (this.props.is_teacher && this.props.userId == this.props.match.params.id) ?
            Object.keys(currentTeacher).length > 0 ? 
                (
                <div>
                  <TeacherImageUpload />
                  <br />
                  <Form onSubmit={this.handleSubmit} >
                    {/* <Row>
                      <Col span={4} >
                        <Form.Item
                          name="image"
                          label="Image"
                          // valuePropName="fileList"
                          // getValueFromEvent={this.normFile}
                          // extra="longgggggggggggggggggggggggggggggggggg"
                          // label={`Image`}
                        >
                          <Upload>
                            <Button>
                              <UploadOutlined /> Select Image
                            </Button>
                          </Upload>
                        </Form.Item>
                      </Col>
                    </Row> */}
                    <Row gutter={24}>
                      <Col span={8} >
                        <Form.Item label={`First Name`}>
                          {getFieldDecorator("first_name", {
                            initialValue: first_name,
                            rules: [{ message: "Please input your first name!" }]
                          })(
                            <Input
                              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                              placeholder="First Name"
                            />
                          )}
                        </Form.Item>
                      </Col>

                      <Col span={8} >
                        <Form.Item label={`Last Name`}>
                          {getFieldDecorator("last_name", {
                            initialValue: last_name,
                            rules: [{required: true, message: "Please input your last name!" }]
                          })(
                            <Input
                              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                              placeholder="Last Name"
                            />
                          )}
                        </Form.Item>
                      </Col>

                      <Col span={8} >
                        <Form.Item label={`Username`}>
                          {getFieldDecorator("username", {
                            initialValue: username,
                            rules: [{required: true, message: "Please input your username!" }]
                          })(
                            <Input
                              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                              placeholder="Username"
                            />
                          )}
                        </Form.Item>
                      </Col>

                      <Col span={8} >
                        <Form.Item label={`Email`}>
                          {getFieldDecorator("email", {
                            initialValue: email,
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
                        </Form.Item>
                      </Col>
                      
                      {/* <Col span={8} >
                        <FormItem label={`School`}>
                          { getFieldDecorator("school", {
                              rules: [
                                {
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
                      </Col> */}
                    {!this.props.is_teacher ?
                      (
                        <Col span={8} >
                          <Form.Item label={`Select User`}>
                            { this.props.is_school_admin && !this.props.is_system_admin ?
                              (getFieldDecorator("userType", {
                              initialValue: is_role,
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
                                initialValue: is_role,
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
                          </Form.Item>
                        </Col>
                      )
                      :
                      null
                    }

                    {teachers.map((v, k) => {
                      return (
                        <div key={k}>
                          <Col span={8} >
                            <Form.Item label={`Gender`}>
                              {getFieldDecorator(`gender`, {
                                initialValue: v.gender,
                              })
                                (
                                <Select placeholder="Select your gender">
                                  <Option value="male">Male</Option>
                                  <Option value="female">Female</Option>
                                </Select>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Date of Birth`}>
                              {getFieldDecorator(`date_of_birth`, {
                                // defaultValue: moment(v.date_of_birth, 'DD-MM-YYYY'),
                                defaultValue: moment(v.date_of_birth, 'YYYY-MM-DD'),
                              })
                                (
                                  <DatePicker />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Country`}>
                              {getFieldDecorator(`country`, {
                                initialValue: v.country,
                              })
                                (
                                <Select placeholder="Select your country">
                                  <Option value="usa">USA</Option>
                                  <Option value="nigeria">Nigeria</Option>
                                </Select>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`State`}>
                              {getFieldDecorator(`state`, {
                                initialValue: v.state,
                              })
                                (
                                <Select placeholder="Select your state">
                                  <Option value="washinton">Washinton</Option>
                                  <Option value="imo">Imo</Option>
                                </Select>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`City`}>
                              {getFieldDecorator(`city`, {
                                initialValue: v.city,
                              })
                                (
                                  <Input placeholder="City" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Street`}>
                              {getFieldDecorator(`street`, {
                                initialValue: v.street,
                              })
                                (
                                  <Input placeholder="Street" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Zip Code`}>
                              {getFieldDecorator(`zip_code`, {
                                initialValue: v.zip_code,
                              })
                                (
                                  <Input placeholder="Zip code" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Years of Experience (Optional)`}>
                              {getFieldDecorator(`years_of_experience`, {
                                initialValue: v.years_of_experience,
                              })
                                (
                                  <Input placeholder="Years of Experience" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Academic Qualification`}>
                              {getFieldDecorator(`academic_qualification`, {
                                initialValue: v.academic_qualification,
                              })
                                (
                                <Input placeholder="Academic Qualification" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Phone`}>
                              {getFieldDecorator(`phone`, {
                                initialValue: v.phone,
                              })
                                (
                                <Input placeholder="Phone" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Emergency Contact1`}>
                              {getFieldDecorator(`emergency_contact1`, {
                                initialValue: v.emergency_contact1,
                              })
                                (
                                <Input placeholder="Emergency Contact1" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Emergency Contact2`}>
                              {getFieldDecorator(`emergency_contact2`, {
                                initialValue: v.emergency_contact2,
                              })
                                (
                                <Input placeholder="Emergency Contact2" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Blood Group`}>
                              {getFieldDecorator(`blood_group`, {
                                initialValue: v.blood_group,
                              })
                                (
                                <Input placeholder="Blood Group" />
                              )}
                            </Form.Item>
                          </Col>
                        </div>
                      )
                    })}
                    </Row>
                    <Row>
                      <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Form>
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


const WrappedTeacherUpdate = Form.create()(TeacherUpdate)


const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    schoolId: state.auth.schoolId,
    is_system_admin: state.auth.is_system_admin,
    is_school_admin: state.auth.is_school_admin,
    is_teacher: state.auth.is_teacher,
    username: state.auth.username,
    currentTeacher: state.users.currentUser,
    loading: state.users.loading,
    error: state.users.error
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     teacherForm: (token, user, image, date_of_birth, gender, street, city, state, country, zip_code, years_of_experience, academic_qualification, phone, emergency_contact1, emergency_contact2, blood_group) =>
//       dispatch(teacherForm(token, user, image, date_of_birth, gender, street, city, state, country, zip_code, years_of_experience, academic_qualification, phone, emergency_contact1, emergency_contact2, blood_group))
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (token, id, teacher) => dispatch(updateUser(token, id, teacher)),
    getUserDetail: (token, id) => dispatch(getUserDetail(token, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedTeacherUpdate)

// export default TeacherUpdate