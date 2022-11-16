import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Upload, Modal } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

import { updateUser, getUserDetail } from "../../actions/users";
import StudentImageUpload from './forms/StudentImageUpload';

const Option = Select.Option;



class StudentUpdate extends Component {

  // state = {
  //   previewVisible: false,
  //   previewImage: '',
  //   fileList: {},
  // };
  state = {
    confirmDirty: false,
    // image: null,
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getStudentDetail(this.props.token, this.props.match.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getStudentDetail(newProps.token, this.props.match.params.id);
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let is_student = true;
        let is_teacher = false;
        let is_school_admin = false;
        let is_system_admin = false;
        const students = [];
        // for (let i = 0; i < values.questions.length; i += 1) {
          students.push({
            // image: values.image,
            date_of_birth: values.date_of_birth,
            gender: values.gender,
            street: values.street,
            city: values.city,
            state: values.state,
            country: values.country,
            zip_code: values.zip_code,
            father_name: values.father_name,
            mother_name: values.mother_name,
            father_occupation: values.father_occupation,
            mother_occupation: values.mother_occupation,
            father_phone: values.father_phone,
            mother_phone: values.mother_phone,
            father_email: values.father_email,
            mother_email: values.mother_email,
            emergency_contact1: values.emergency_contact1,
            emergency_contact2: values.emergency_contact2,
            blood_group: values.blood_group,
            mother_tongue: values.mother_tongue,
            father_annual_income: values.father_annual_income,
            mother_annual_income: values.mother_annual_income,
            previous_school_info: values.previous_school_info,
            class_of_admission: values.class_of_admission,
            year_of_admission: values.year_of_admission,
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
          students,
          
        }
        this.props.updateStudent(this.props.token, this.props.match.params.id, user);
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
    const { currentStudent } = this.props;
    const { first_name, last_name, username, email, is_student, school, students } = currentStudent;


    return (
      <div>
        {
        // is_student == true && school == this.props.schoolId ?
          this.props.is_system_admin || this.props.is_school_admin || this.props.is_teacher || (this.props.is_student && this.props.userId == this.props.match.params.id) ?
            Object.keys(currentStudent).length > 0 ? 
              (
                <div>
                  <StudentImageUpload />
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
                            rules: [{ required: true, message: "Please input your first name!" }]
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
                    

                    {students.map((v, k) => {
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
                            <Form.Item label={`Father's Name`}>
                              {getFieldDecorator(`father_name`, {
                                initialValue: v.father_name,
                              })
                                (
                                  <Input placeholder="Father's Name" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Mother's Name`}>
                              {getFieldDecorator(`mother_name`, {
                                initialValue: v.mother_name,
                              })
                                (
                                <Input placeholder="Mother's Name" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Father's Occupation`}>
                              {getFieldDecorator(`father_occupation`, {
                                initialValue: v.father_occupation,
                              })
                                (
                                <Input placeholder="Father's Occupation" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Mother's Occupation`}>
                              {getFieldDecorator(`mother_occupation`, {
                                initialValue: v.mother_occupation,
                              })
                                (
                                <Input placeholder="Mother's Occupation" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Father's Phone`}>
                              {getFieldDecorator(`father_phone`, {
                                initialValue: v.father_phone,
                              })
                                (
                                <Input placeholder="Father's Phone" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Mother's Phone`}>
                              {getFieldDecorator(`mother_phone`, {
                                initialValue: v.mother_phone,
                              })
                                (
                                <Input placeholder="Mother's Phone" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Father's Email`}>
                              {getFieldDecorator(`father_email`, {
                                initialValue: v.father_email,
                              })
                                (
                                <Input placeholder="Father's Email" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Mother's Email`}>
                              {getFieldDecorator(`mother_email`, {
                                initialValue: v.mother_email,
                              })
                                (
                                <Input placeholder="Mother's Email" />
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
                          <Col span={8} >
                            <Form.Item label={`Mother Tongue`}>
                              {getFieldDecorator(`mother_tongue`, {
                                initialValue: v.mother_tongue,
                              })
                                (
                                <Input placeholder="Mother Tongue" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Father Annual Income`}>
                              {getFieldDecorator(`father_annual_income`, {
                                initialValue: v.father_annual_income,
                              })
                                (
                                <Input placeholder="Father Annual Income" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Mother Annual Income`}>
                              {getFieldDecorator(`mother_annual_income`, {
                                initialValue: v.mother_annual_income,
                              })
                                (
                                <Input placeholder="Mother Annual Income" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Previous School Info`}>
                              {getFieldDecorator(`previous_school_info`, {
                                initialValue: v.previous_school_info,
                              })
                                (
                                <Input placeholder="Previous School Info" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Class of Admission`}>
                              {getFieldDecorator(`class_of_admission`, {
                                initialValue: v.class_of_admission,
                              })
                                (
                                <Input placeholder="Class of Admission" />
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={8} >
                            <Form.Item label={`Year of admission`}>
                              {getFieldDecorator(`year_of_admission`, {
                                initialValue: v.year_of_admission,
                              })
                                (
                                <Input placeholder="Year of admission" />
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


const WrappedStudentUpdate = Form.create()(StudentUpdate)


const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    schoolId: state.auth.schoolId,
    is_system_admin: state.auth.is_system_admin,
    is_school_admin: state.auth.is_school_admin,
    is_teacher: state.auth.is_teacher,
    is_student: state.auth.is_student,
    username: state.auth.username,
    currentStudent: state.users.currentUser,
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
    updateStudent: (token, id, student) => dispatch(updateUser(token, id, student)),
    getStudentDetail: (token, id) => dispatch(getUserDetail(token, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedStudentUpdate)

// export default TeacherUpdate