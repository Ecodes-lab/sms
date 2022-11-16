import React from 'react';
import { connect } from 'react-redux';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { updateSchoolImage, getSchoolDetail } from '../../../actions/schools'
// import reqwest from 'reqwest';
import axios from 'axios';

class TeacherImageUpload extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };

  
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    // fileList.forEach(file => {
      formData.append('image', fileList[0], fileList[0].name);
      // formData.append('logo', file, file.name);
    // });

    this.setState({
      uploading: true,
    });


    axios.defaults.headers = {
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .put(`http://127.0.0.1:8000/teachers-image/${this.props.currentTeacher.teachers[0].id}/`, formData)
      .then(res => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
        console.log(res)
      })
      .catch(err => {
        this.setState({
          uploading: false,
        });
        message.error('sorry error has occured.', err);
        console.log(err)
      });

  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      multiple: false,
      showUploadList: {
        showDownloadIcon: false
      },
      onRemove: file => {
        this.setState(state => {
          // const index = state.fileList.indexOf(file);
          // const newFileList = state.fileList.slice();
          // newFileList.splice(index, 1);
          return {
            fileList: [],
            // fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [file],
          // fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Upload {...props} accept=".jpg,.png" >
          <Button>
            <UploadOutlined /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  }
}


// const WrappedSchoolImageUpload = Form.create()(SchoolImageUpload);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    is_system_admin: state.auth.is_system_admin,
    username: state.auth.username,
    currentTeacher: state.users.currentUser,
    loading: state.users.loading,
    error: state.users.error
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     updateSchoolImage: (token, id, school) => dispatch(updateSchoolImage(token, id, school)),
//     getSchoolDetail: (token, id) => dispatch(getSchoolDetail(token, id)),
//   };
// };

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(TeacherImageUpload);
// export default SchoolImageUpload