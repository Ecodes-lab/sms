import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Skeleton, Card, Modal, Input, Button, Table } from 'antd';
// import Highlighter from 'react-highlight-words';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { getSchoolDetail, deleteSchool } from '../../actions/schools';
import { getUsers } from '../../actions/users';
import SchoolUpdate from './SchoolUpdate';


const { confirm } = Modal;

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Joe Black',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Jim Green',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];

class SchoolDetails extends Component {
  state = {
    searchText: 'test',
    searchedColumn: 'test',
  };

  

  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getSchoolDetail(this.props.token, this.props.match.params.id);
      this.props.getTeachers(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getSchoolDetail(newProps.token, this.props.match.params.id);
        this.props.getTeachers(newProps.token);
      }
    }
  }


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <div />
        // <Highlighter
        //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //   searchWords={[this.state.searchText]}
        //   autoEscape
        //   textToHighlight={text.toString()}
        // />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  
  
  onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }


  showConfirmDelete = e => {
    e.preventDefault();
    const { deleteSchool } = this.props;
    confirm({
      title: 'Do you want to delete these school?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk: () => {
        this.props.deleteSchool(this.props.token, this.props.match.params.id);
        this.props.history.push("/school/all-schools")
      },
      onCancel() {},
    });
  }


  render() {
    const { currentSchool } = this.props;
    const { id, name, street, city, state, country, zipcode, owner_name, phone, fax, email, website } = currentSchool;

    const data = []
    // const columns = [
    //   {
    //     title: 'Name',
    //     dataIndex: 'name',
    //     key: 'name',
    //     width: '30%',
    //     ...this.getColumnSearchProps('name'),
    //   },
    //   {
    //     title: 'Gender',
    //     dataIndex: 'age',
    //     key: 'age',
    //     width: '20%',
    //     ...this.getColumnSearchProps('age'),
    //   },
    //   {
    //     title: 'Address',
    //     dataIndex: 'address',
    //     key: 'address',
    //     ...this.getColumnSearchProps('address'),
    //   },
    // ];

  const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: '20%',
        ...this.getColumnSearchProps('gender'),
        // defaultSortOrder: 'descend',
        // sorter: (a, b) => a.gender - b.gender,
      },
      {
        title: 'Address',
        dataIndex: 'address',  
        key: 'address',
        ...this.getColumnSearchProps('address'),
        // filters: [
        //   {
        //     text: 'London',
        //     value: 'London',
        //   },
        //   {
        //     text: 'New York',
        //     value: 'New York',
        //   },
        // ],
        // filterMultiple: false,
        // onFilter: (value, record) => record.address.indexOf(value) === 0,
        // sorter: (a, b) => a.address.length - b.address.length,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Role',
        dataIndex: 'role',
        // key: 'name',
        // width: '30%',
        // ...this.getColumnSearchProps('name'),
        filters: [
          {
            text: 'School Admins',
            value: 'School Admin',
          },
          {
            text: 'Teachers',
            value: 'Teacher',
          },
          {
            text: 'Students',
            value: 'Student',
          },
          // {
          //   text: 'Submenu',
          //   value: 'Submenu',
          //   children: [
          //     {
          //       text: 'Green',
          //       value: 'Green',
          //     },
          //     {
          //       text: 'Black',
          //       value: 'Black',
          //     },
          //   ],
          // },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        filterMultiple: false,
        onFilter: (value, record) => record.role.indexOf(value) === 0,
        sorter: (a, b) => a.role.length - b.role.length,
        sortDirections: ['descend'],
      },
    ];

    this.props.users.map((v, k) => {
      let role = null
        if (v.is_school_admin === true) {
          role = "School Admin"
        } else if (v.is_teacher === true) {
          role = "Teacher"
      }

      let name = v.first_name + " " + v.last_name
      
      v.teachers.map((t, i) => {

        data.push(
          {
            key: v.id,
            name: name,
            gender: t.gender ? t.gender : "No Data",
            address: t.country ? t.country : "No Data",
            role: role,
          },
        );
      })

      v.students.map((s, i) => {

        data.push(
          {
            key: v.id,
            name: name,
            gender: s.gender ? s.gender : "No Data",
            address: s.country ? s.country : "No Data",
            role: "Student",
          },
        );
      })
    })
    
    return (
      <div>
        {this.props.is_system_admin && Object.keys(currentSchool).length > 0 ? (
          <div className="m-auto mt-5">
            {this.props.loading ? (
              <Skeleton active />
            ) : (
                <Card
                  title={name}
                  extra={
                    <div>
                      <Link to={`/school/${id}/update`}><Button type="primary">
                        Edit
                      </Button></Link>
                      <Button type="danger"  onClick={this.showConfirmDelete}>
                        Delete
                      </Button>
                    </div>
                  }
                  style={{ width: "100%" }}>
                <p><strong>Street: </strong>{street}</p>
                <p><strong>City: </strong>{city}</p>
                <p><strong>State: </strong>{state}</p>
                <p><strong>Country: </strong>{country}</p>
                <p><strong>Zip Code: </strong>{zipcode}</p>
                <p><strong>Owner Name: </strong>{owner_name}</p>
                <p><strong>Phone: </strong>{phone}</p>
                <p><strong>Fax: </strong>{fax}</p>
                <p><strong>Email: </strong>{email}</p>
                <p><strong>Website: </strong>{website}</p>
                <br />
                <p><strong><h2>School Teachers & Students</h2></strong></p>
                  
                  <Table columns={columns} dataSource={data} onChange={this.onChange} />
              </Card>
              
            )}
          </div>
        ) : null}
        
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    is_system_admin: state.auth.is_system_admin,
    currentSchool: state.schools.currentSchool,
    users: state.users.users,
    students: state.users.users,
    loading: state.schools.loading,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteSchool: (token, id) => dispatch(deleteSchool(token, id)),
    getSchoolDetail: (token, id) => dispatch(getSchoolDetail(token, id)),
    getTeachers: (token) => dispatch(getUsers(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolDetails);
