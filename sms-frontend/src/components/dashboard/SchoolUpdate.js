import React from "react";
import { connect } from "react-redux";
import { Form, Input, Icon, Button, Select, InputNumber, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";

import { createSchool, getSchoolDetail, updateSchool } from "../../actions/schools";
import ImageUpload from "./forms/ImageUpload";

import SchoolImageUpload from "./forms/SchoolImageUpload";

const FormItem = Form.Item;
const Option = Select.Option;

class SchoolUpdate extends React.Component {
  state = {
    confirmDirty: false,
    image: null
  };

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getSchoolDetail(this.props.token, this.props.match.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getSchoolDetail(newProps.token, this.props.match.params.id);
      }
    }
  }

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
          // logo: values.logo,
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
        
        this.props.updateSchool(
          this.props.token,
          this.props.match.params.id,
          school
        );
        // this.props.history.push("/school-update/");
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };



  render() {
    const { getFieldDecorator } = this.props.form;
    const { currentSchool } = this.props;
    const { name, street, city, state, country, zipcode, owner_name, phone, fax, email, website } = currentSchool;
    return (
      <div>
        { this.props.is_system_admin && Object.keys(currentSchool).length > 0 ? (
          <div>
            <SchoolImageUpload />
            <br />
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator("name", {
                  initialValue: name,
                  rules: [{ required: true, message: "School name is required!" }]
                })(
                  <Input
                    placeholder="School Name"
                  />
                )}
              </FormItem>
           
              <FormItem>
                {getFieldDecorator("country", {
                  initialValue: country,
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
              <FormItem>
                {getFieldDecorator("state", {
                  initialValue: state,
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
              <FormItem>
                {getFieldDecorator("city", {
                  initialValue: city,
                  rules: [
                    {
                      required: true,
                      message: "Please select school city!"
                    }
                  ]
                })(
                  <Select placeholder="Select a user type">
                    <Option value="owerri">owerri</Option>
                    <Option value="awka">awka</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("street", {
                  initialValue: street,
                  rules: [{ required: true, message: "Please enter school street!" }]
                })(
                  <Input
                    placeholder="School Street"
                  />
                )}
              </FormItem>


              <FormItem>
                {getFieldDecorator("zipcode", {
                  initialValue: zipcode,
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
              <FormItem>
                {getFieldDecorator("owner_name", {
                  initialValue: owner_name,
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
              <FormItem>
                {getFieldDecorator("phone", {
                  initialValue: phone,
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
              <FormItem>
                {getFieldDecorator("fax", {
                  initialValue: fax,
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
              <FormItem>
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
                    placeholder="Email"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator("website", {
                  initialValue: website,
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
                  Update School
              </Button>
                {/* Or
              <NavLink style={{ marginRight: "10px" }} to="/login/">
                login
              </NavLink> */}
              </FormItem>
            </Form>
          </div>
        ) : null}
      </div>
    );
  }
}

const WrappedSchoolUpdate = Form.create()(SchoolUpdate);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    is_system_admin: state.auth.is_system_admin,
    username: state.auth.username,
    currentSchool: state.schools.currentSchool,
    loading: state.schools.loading,
    error: state.schools.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSchool: (token, id, school) => dispatch(updateSchool(token, id, school)),
    getSchoolDetail: (token, id) => dispatch(getSchoolDetail(token, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedSchoolUpdate);
