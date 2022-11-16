import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select, Upload, Modal } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { teacherForm } from "../../../actions/users";

const Option = Select.Option;



class TeachersForm extends Component {

  // state = {
  //   previewVisible: false,
  //   previewImage: '',
  //   fileList: {},
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log("Received values of form: ", values);
  //       // const teacher = [];
  //       // for (let i = 0; i < values.questions.length; i += 1) {
  //       //   teacher.push({
  //       //     title: values.question[i],
  //       //     choices: values.questions[i].choices.filter(el => el !== null),
  //       //     answer: values.answers[i]
  //       //   });
  //       // }
  //       // const asnt = {
  //       //   teacher: this.props.username,
  //       //   title: values.title,
  //       //   questions
  //       // };
  //       const teacher = {
  //         user:             this.props.username,
  //         image:            values.image,
  //         date_of_birth:    values.date_of_birth,
  //         gender:           values.gender,
  //         street:           values.street,
  //         city:             values.city,
  //         state:            values.state,
  //         country:          values.country,
  //         zip_code:         values.zip_code,
  //         years_of_experience:    values.years_of_experience,
  //         academic_qualification: values.academic_qualification,
  //         phone:                  values.phone,
  //         emergency_contact1:     values.emergency_contact1,
  //         emergency_contact2:     values.emergency_contact2,
  //         blood_group:            values.blood_group,
  //       }
  //       this.props.teacherForm(this.props.token, teacher);
  //     }
  //   });
  // };

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

  handleReset = () => {
    this.props.form.resetFields();
  };




  render() {
    const { getFieldDecorator } = this.props.form;

    // const { previewVisible, previewImage, fileList } = this.state;
    // const uploadButton = (
    //   <div>
    //     <PlusOutlined />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );

    return (
      <div>
        <Form>
          <Row>
            <Col span={4} >
              <Form.Item
                name="upload"
                label="Image"
                // valuePropName="fileList"
                // getValueFromEvent={this.normFile}
                // extra="longgggggggggggggggggggggggggggggggggg"
                // label={`Image`}
              >
                {getFieldDecorator(`image`, {
                    rules: [
                      {
                        // required: true,
                        message: 'image is required!',
                      },
                    ],
                  })
                  (
                    <Upload name="logo" action="" listType="picture">
                      <Button>
                        <UploadOutlined /> Click to upload
                      </Button>
                    </Upload>
                  // <div>
                  //   <Upload
                  //     listType="picture-card"
                  //     fileList={fileList}
                  //     onPreview={this.handlePreview}
                  //     onChange={this.handleChange}
                  //   >
                  //     {fileList.length >= 2 ? null : uploadButton}
                  //   </Upload>
                  //   <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  //     <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  //   </Modal>
                  // </div> 
                )
              }
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            {/* <Col span={8} >
              <Form.Item label={`First Name`}>
                {getFieldDecorator(`firstName`, {
                  initialValue: this.props.first_name,
                  rules: [
                    {
                      // required: true,
                      message: 'First Name is required!',
                    },
                  ],
                })
                  (
                  <Input placeholder="First Name"  disabled />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={`Last Name`}>
                {getFieldDecorator(`lastName`, {
                  initialValue: this.props.last_name,
                  rules: [
                    {
                      // required: true,
                      message: 'Last is required!',
                    },
                  ],
                })
                  (
                    <Input placeholder="Last Name" disabled  />
                )}
              </Form.Item>
            </Col> */}
            <Col span={8} >
              <Form.Item label={`Gender`}>
                {getFieldDecorator(`gender`, {
                  rules: [
                    {
                      // required: true,
                      message: 'Gender is required!',
                    },
                  ],
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
                  rules: [
                    {
                      // required: true,
                      message: 'Date of birth is required!',
                    },
                  ],
                })
                  (
                    <DatePicker />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={`Country`}>
                {getFieldDecorator(`country`, {
                  rules: [
                    {
                      // required: true,
                      message: 'Country is required!',
                    },
                  ],
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
                  rules: [
                    {
                      // required: true,
                      message: 'State is required!',
                    },
                  ],
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
                  rules: [
                    {
                      // required: true,
                      message: 'city is required!',
                    },
                  ],
                })
                  (
                    <Input placeholder="City" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={`Street`}>
                {getFieldDecorator(`street`, {
                  rules: [
                    {
                      // required: true,
                      message: 'street is required!',
                    },
                  ],
                })
                  (
                    <Input placeholder="Street" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={`Zip Code`}>
                {getFieldDecorator(`zip_code`, {
                  rules: [
                    {
                      // required: true,
                      message: 'Zip code is required!',
                    },
                  ],
                })
                  (
                    <Input placeholder="Zip code" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={`Years of Experience (Optional)`}>
                {getFieldDecorator(`years_of_experience`, {
                  rules: [
                    {
                      // required: true,
                      message: 'experience is required!',
                    },
                  ],
                })
                  (
                    <Input placeholder="Years of Experience" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={`Academic Qualification`}>
                {getFieldDecorator(`academic_qualification`, {
                  rules: [
                    {
                      // required: true,
                      message: 'Academic Qualification is required!',
                    },
                  ],
                })
                  (
                  <Input placeholder="Academic Qualification" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={`Phone`}>
                {getFieldDecorator(`phone`, {
                  rules: [
                    {
                      // required: true,
                      message: 'Phone is required!',
                    },
                  ],
                })
                  (
                  <Input placeholder="Phone" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={`Emergency Contact1`}>
                {getFieldDecorator(`emergency_contact1`, {
                  rules: [
                    {
                      // required: true,
                      message: 'Emergency Contact1 is required!',
                    },
                  ],
                })
                  (
                  <Input placeholder="Emergency Contact1" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={`Emergency Contact2`}>
                {getFieldDecorator(`emergency_contact2`, {
                  rules: [
                    {
                      // required: true,
                      message: 'Emergency Contact2 is required!',
                    },
                  ],
                })
                  (
                  <Input placeholder="Emergency Contact2" />
                )}
              </Form.Item>
            </Col>
            <Col span={8} >
              <Form.Item label={`Blood Group`}>
                {getFieldDecorator(`blood_group`, {
                  rules: [
                    {
                      // required: true,
                      message: 'Blood Group is required!',
                    },
                  ],
                })
                  (
                  <Input placeholder="Blood Group" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}


// const WrappedTeachersForm = Form.create()(TeachersForm)


// const mapStateToProps = state => {
//   return {
//     token: state.auth.token,
//     username: state.auth.username,
//     first_name: state.auth.first_name,
//     last_name: state.auth.last_name,
//     // userId: state.auth.userId,
//     loading: state.teacherForm.loading
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     teacherForm: (token, user, image, date_of_birth, gender, street, city, state, country, zip_code, years_of_experience, academic_qualification, phone, emergency_contact1, emergency_contact2, blood_group) =>
//       dispatch(teacherForm(token, user, image, date_of_birth, gender, street, city, state, country, zip_code, years_of_experience, academic_qualification, phone, emergency_contact1, emergency_contact2, blood_group))
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     teacherForm: (token, teacher) =>
//       dispatch(teacherForm(token, teacher))
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(WrappedTeachersForm)

export default TeachersForm