import React from "react";
import { Form, Input, Icon, Button, Select, InputNumber, Upload, message } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { createSchool } from "../../actions/schools";
import ImageUpload from "./forms/ImageUpload";

import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const Option = Select.Option;

class SchoolCreate extends React.Component {
  state = {
    confirmDirty: false,
    image: null
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // const { imageData } = this.props;
        // const formData = new FormData();
        // fileList.forEach(file => {
        //   formData.append('files[]', file);
        // });
        // console.log('Upload event2:', values.logo);
        // if (Array.isArray(values.logo)) {
        //   return e;
        // }
        // return e && e.fileList;
        const school = {
          // user: this.props.username,
          name: values.name,
          street: values.street,
          city: values.city,
          state: values.state,
          country: values.country,
          zipcode: values.zipcode,
          owner_name: values.owner_name,
          phone: values.phone,
          fax: values.fax,
          email: values.email,
          website: values.website,
        }
        
        this.props.createSchool(
          this.props.token,
          school
        );
        this.props.history.push("/school/all-schools")
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  // normFile = e => {
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.file;
  // };

  // handleImageChange = (e) => {
  //   this.setState({
  //     image: e.target.files[0]
  //   })
  // };


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        {this.props.is_system_admin ? (
            <div>
              <Form onSubmit={this.handleSubmit}>
                <FormItem label={`School Name`}>
                  {getFieldDecorator("name", {
                    rules: [{ required: true, message: "School name is required!" }]
                  })(
                    <Input
                      placeholder="School Name"
                    />
                  )}
                </FormItem>
                <FormItem label={`Country`}>
                  {getFieldDecorator("country", {
                    rules: [
                      {
                        required: true,
                        message: "Please select school country!"
                      },
                    ]
                  })(
                    <Select placeholder="Select school country">
                      <Option value="usa">USA</Option>
                      <Option value="nigeria">Nigeria</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label={`State`}>
                  {getFieldDecorator("state", {
                    rules: [
                      {
                        required: true,
                        message: "Please select school state!"
                      },
                    ]
                  })(
                    <Select placeholder="Select school state">
                      <Option value="newyork">New York</Option>
                      <Option value="imo">Imo</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label={`City`}>
                  {getFieldDecorator("city", {
                    rules: [
                      {
                        required: true,
                        message: "Please select school city!"
                      }
                    ]
                  })(
                    <Select placeholder="Select a school city">
                      <Option value="owerri">owerri</Option>
                      <Option value="awka">awka</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem label={`Street`}>
                  {getFieldDecorator("street", {
                    rules: [{ required: true, message: "Please enter school street!" }]
                  })(
                    <Input
                      placeholder="School Street"
                    />
                  )}
                </FormItem>


                <FormItem label={`Zip Code`}>
                  {getFieldDecorator("zipcode", {
                    rules: [
                      {
                        required: true,
                        message: "zipcode is required!"
                      }
                    ]
                  })(
                    <InputNumber placeholder="Zipcode" />
                  )}
                </FormItem>
                <FormItem label={`Owner Name`}>
                  {getFieldDecorator("owner_name", {
                    rules: [
                      {
                        required: true,
                        message: "Owner name is required!"
                      }
                    ]
                  })(
                    <Input
                      placeholder="Owner Name"
                    />
                  )}
                </FormItem>
                <FormItem label={`Mobile Number`}>
                  {getFieldDecorator("phone", {
                    rules: [
                      {
                        required: true,
                        message: "phone number is required!"
                      }
                    ]
                  })(
                    <InputNumber placeholder="Mobile number" />
                  )}
                </FormItem>
                <FormItem label={`Fax`}>
                  {getFieldDecorator("fax", {
                    rules: [
                      {
                        required: true,
                        message: "fax is required!"
                      }
                    ]
                  })(
                    <Input
                      placeholder="Fax"
                    />
                  )}
                </FormItem>
                <FormItem label={`Email`}>
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
                      placeholder="Email"
                    />
                  )}
                </FormItem>
                <FormItem label={`Website`}>
                  {getFieldDecorator("website", {
                    rules: [
                      {
                        required: true,
                        message: "School website is required!"
                      }
                    ]
                  })(
                    <Input
                      placeholder="Website"
                    />
                  )}
                </FormItem>

                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: "10px" }}
                  >
                    Create School
                  </Button>
                  {/* Or
                  <NavLink style={{ marginRight: "10px" }} to="/login/">
                    login
                  </NavLink> */}
                </FormItem>
              </Form>
            </div>
          ): null
        }
      </div>
    );
  }
}

const WrappedSchoolCreate = Form.create()(SchoolCreate);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    is_system_admin: state.auth.is_system_admin,
    username: state.auth.username,
    loading: state.schools.loading,
    error: state.schools.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createSchool: (token, school) => dispatch(createSchool(token, school))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedSchoolCreate);
