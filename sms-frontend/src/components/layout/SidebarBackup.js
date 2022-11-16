import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
    DashboardOutlined,
    TeamOutlined,
    HomeOutlined,
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    InboxOutlined
} from '@ant-design/icons';
// import { MdGroup, MdSchool } from 'react-icons/md';

import Hoc from '../../hoc/hoc';

const { SubMenu } = Menu;

export default class Sidebar extends Component {
    rootSubmenuKeys = ["dashboard", "schools", "teachers", "students"]
    state = {
        admin_links: [],
        schooladmin_links: [],
        teacher_links: [],
        student_links: [],
        openKeys: ["dashboard"],
        collapsed: false,
    }


    componentDidMount() {
        const dashboard = {
            icon: <DashboardOutlined />,
            key: "dashboard",
            dropdownTitleLink: '/',
            dropdownTitle: "Dashboard",
            dropdowns: [],
        }

        const schools = {
            icon: <HomeOutlined />,
            key: "schools",
            dropdownTitleLink: '#',
            dropdownTitle: " Schools",
            dropdowns: [
                {
                    link: '/school/all-schools',
                    linkTitle: 'All Schools'
                },
                {
                    link: '/school/register-school',
                    linkTitle: 'Add School'
                },
            ],
        }

        const teachers = {
            icon: <TeamOutlined />,
            key: "teachers",
            dropdownTitleLink: ' #',
            dropdownTitle: " Teachers",
            dropdowns: [
                {
                    link: '/teacher/all-teachers',
                    linkTitle: 'All Teacher'
                },
                {
                    link: '/teacher/register-teacher',
                    linkTitle: 'Add Teacher'
                },
            ],
        }

        const students = {
            icon: <TeamOutlined />,
            key: "students",
            dropdownTitleLink: '#',
            dropdownTitle: " Students",
            dropdowns: [
                {
                    link: '/student/all-students',
                    linkTitle: 'All Students'
                },
                {
                    link: '/student/register-student',
                    linkTitle: 'Add Student'
                },
            ],
        }

        this.state.admin_links.push(
            dashboard,
            schools,
            teachers,
            students,
        )

        this.state.schooladmin_links.push(
            dashboard,
            teachers,
            students,
        )

        this.state.teacher_links.push(
            dashboard,
            students,
        )

        this.state.student_links.push(
            dashboard,
        )
    }

    // rootSubmenuKeys = ['0', '1', '2'];

    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };

    onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({ openKeys });
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
      }
    };

    render() {
        const { isAuthenticated, user } = this.props;

        let admin = this.state.admin_links.map((val, key) => {
            // this.setState({
            //     rootSubmenuKeys: key
            // })
            // this.state.rootSubmenuKeys.push([key])
            // return (
                // <div key={key}>
            if (val.dropdowns.length === 0) {
                return (
                    <Menu.Item key={val.key}><Link to={val.dropdownTitleLink}>{val.icon}{val.dropdownTitle}</Link></Menu.Item>
                )
            } else {

               return (

                    <SubMenu
                    key={val.key}
                    title={
                        <span>
                        {val.icon}
                        <span>{val.dropdownTitle}</span>
                        </span>
                    }
                    >
                        {
                            val.dropdowns.map((v, k) => {
                                return (
                                    <Menu.Item key={k}><Link to={v.link} className="nav-link"><i className="fas fa-angle-right"></i>{v.linkTitle}</Link></Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                )
            }
                
                // </div>
                
                // <li key={key} className="nav-item sidebar-nav-item">
                //     <a href={val.dropdownTitleLink} className="nav-link"><i className={val.icon}></i><span>{val.dropdownTitle}</span></a>
                //     {val.dropdowns.length !== 0 ?
                //         (
                //             <ul className="nav sub-group-menu">
                //                 {
                //                     val.dropdowns.map((v, k) => {
                //                         return (
                //                             <li key={k} className="nav-item">
                //                                 <Link to={v.link} className="nav-link"><i className="fas fa-angle-right"></i>{v.linkTitle}</Link>
                //                             </li>
                //                         )
                //                     })
                //                 }
                //             </ul>
                //         )
                //         :
                //         ''
                //     }
                    
                // </li>
            // )
        })

        let schooladmin = this.state.schooladmin_links.map((val, key) => {
            return ( 
                <li key={key} className="nav-item sidebar-nav-item">
                    <a href={val.dropdownTitleLink} className="nav-link"><i className={val.icon}></i><span>{val.dropdownTitle}</span></a>
                    {val.dropdowns.length !== 0 ?
                        (
                            <ul className="nav sub-group-menu">
                                {
                                    val.dropdowns.map((v, k) => {
                                        return (
                                            <li key={k} className="nav-item">
                                                <Link to={v.link} className="nav-link"><i className="fas fa-angle-right"></i>{v.linkTitle}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                        :
                        ''
                    }
                    
                </li>
            )
        })

        let teacher = this.state.teacher_links.map((val, key) => {
            return ( 
                <li key={key} className="nav-item sidebar-nav-item">
                    <a href={val.dropdownTitleLink} className="nav-link"><i className={val.icon}></i><span>{val.dropdownTitle}</span></a>
                    {val.dropdowns.length !== 0 ?
                        (
                            <ul className="nav sub-group-menu">
                                {
                                    val.dropdowns.map((v, k) => {
                                        return (
                                            <li key={k} className="nav-item">
                                                <Link to={v.link} className="nav-link"><i className="fas fa-angle-right"></i>{v.linkTitle}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                        :
                        ''
                    }
                    
                </li>
            )
        })

        let student = this.state.student_links.map((val, key) => {
            return ( 
                <li key={key} className="nav-item sidebar-nav-item">
                    <a href={val.dropdownTitleLink} className="nav-link"><i className={val.icon}></i><span>{val.dropdownTitle}</span></a>
                    {val.dropdowns.length !== 0 ?
                        (
                            <ul className="nav sub-group-menu">
                                {
                                    val.dropdowns.map((v, k) => {
                                        return (
                                            <li key={k} className="nav-item">
                                                <Link to={v.link} className="nav-link"><i className="fas fa-angle-right"></i>{v.linkTitle}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                        :
                        ''
                    }
                    
                </li>
            )
        })
        let sidebar_links;

        if (user.is_system_admin) {
            sidebar_links = admin
        } else if (user.is_school_admin) {
            sidebar_links = schooladmin
        } else if (user.is_teacher) {
            sidebar_links = teacher
        } else if (user.is_student) {
            sidebar_links = student
        }

        const sidebar = (
            // <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
            //     <div className="mobile-sidebar-header d-md-none">
            //         <div className="header-logo">
            //             <a href="index.html"><img src="/static/assets/img/logo1.png" alt="logo" /></a>
            //         </div>
            //     </div>
            //     <div className="sidebar-menu-content">
                    
            //         <ul className="nav nav-sidebar-menu sidebar-toggle-view"> 
            //             {sidebar_links}
            //         </ul>
            //     </div>
            // </div>
            <div style={{ width: 256 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}  
                    onOpenChange={this.onOpenChange}
                    style={{ width: 256 }}
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    {sidebar_links}
                </Menu>
            </div>
        )
    return (
        <Hoc>
            {
            isAuthenticated ? sidebar : ''
            }
        </Hoc>
        
    )
  }
}







import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Menu, Button } from 'antd';
import {
    DashboardOutlined,
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    InboxOutlined } from '@ant-design/icons';

import Hoc from '../../hoc/hoc';

const { SubMenu } = Menu;

export default class Sidebar extends Component {
    rootSubmenuKeys = ["dashboard", "schools", "teachers", "students"]
    state = {
        admin_links: [],
        schooladmin_links: [],
        teacher_links: [],
        student_links: [],
        openKeys: ["dashboard"],
        collapsed: false,
    }


    componentDidMount() {
        const dashboard = {
            icon: "flaticon-dashboard",
            key: "dashboard",
            dropdownTitleLink: '/',
            dropdownTitle: "Dashboard",
            dropdowns: [],
        }

        const schools = {
            icon: "flaticon-multiple-users-silhouette",
            key: "schools",
            dropdownTitleLink: '#',
            dropdownTitle: "Schools",
            dropdowns: [
                {
                    link: '/school/all-schools',
                    linkTitle: 'All Schools'
                },
                {
                    link: '/school/register-school',
                    linkTitle: 'Add School'
                },
            ],
        }

        const teachers = {
            icon: "flaticon-multiple-users-silhouette",
            key: "teachers",
            dropdownTitleLink: '#',
            dropdownTitle: "Teachers",
            dropdowns: [
                {
                    link: '/teacher/all-teachers',
                    linkTitle: 'All Teacher'
                },
                {
                    link: '/teacher/register-teacher',
                    linkTitle: 'Add Teacher'
                },
            ],
        }

        const students = {
            icon: "flaticon-classmates",
            key: "students",
            dropdownTitleLink: '#',
            dropdownTitle: "Students",
            dropdowns: [
                {
                    link: '/student/all-students',
                    linkTitle: 'All Students'
                },
                {
                    link: '/student/register-student',
                    linkTitle: 'Add Student'
                },
            ],
        }

        this.state.admin_links.push(
            dashboard,
            schools,
            teachers,
            students,
        )

        this.state.schooladmin_links.push(
            dashboard,
            teachers,
            students,
        )

        this.state.teacher_links.push(
            dashboard,
            students,
        )

        this.state.student_links.push(
            dashboard,
        )
    }

    // rootSubmenuKeys = ['0', '1', '2'];

    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };

    onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({ openKeys });
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
      }
    };

    render() {
        const { isAuthenticated, user } = this.props;

        let admin = this.state.admin_links.map((val, key) => {
            // this.setState({
            //     rootSubmenuKeys: key
            // })
            // this.state.rootSubmenuKeys.push([key])
            // return (
                // <div key={key}>
            if (val.dropdowns.length === 0) {
                return (
                    <Menu.Item key={val.key}><Link to={val.dropdownTitleLink}><i className={val.icon}></i>{val.dropdownTitle}</Link></Menu.Item>
                )
            } else {

               return (

                    <SubMenu
                    key={val.key}
                    title={
                        <span>
                            {/* <MailOutlined /> */}
                            <i className={val.icon}></i>
                        <span>{val.dropdownTitle}</span>
                        </span>
                    }
                    >
                        {
                            val.dropdowns.map((v, k) => {
                                return (
                                    <Menu.Item key={k}><Link to={v.link} className="nav-link"><i className="fas fa-angle-right"></i>{v.linkTitle}</Link></Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                )
            }
                
                // </div>
                
                // <li key={key} className="nav-item sidebar-nav-item">
                //     <a href={val.dropdownTitleLink} className="nav-link"><i className={val.icon}></i><span>{val.dropdownTitle}</span></a>
                //     {val.dropdowns.length !== 0 ?
                //         (
                //             <ul className="nav sub-group-menu">
                //                 {
                //                     val.dropdowns.map((v, k) => {
                //                         return (
                //                             <li key={k} className="nav-item">
                //                                 <Link to={v.link} className="nav-link"><i className="fas fa-angle-right"></i>{v.linkTitle}</Link>
                //                             </li>
                //                         )
                //                     })
                //                 }
                //             </ul>
                //         )
                //         :
                //         ''
                //     }
                    
                // </li>
            // )
        })

        let schooladmin = this.state.schooladmin_links.map((val, key) => {
            return ( 
                <li key={key} className="nav-item sidebar-nav-item">
                    <a href={val.dropdownTitleLink} className="nav-link"><i className={val.icon}></i><span>{val.dropdownTitle}</span></a>
                    {val.dropdowns.length !== 0 ?
                        (
                            <ul className="nav sub-group-menu">
                                {
                                    val.dropdowns.map((v, k) => {
                                        return (
                                            <li key={k} className="nav-item">
                                                <Link to={v.link} className="nav-link"><i className="fas fa-angle-right"></i>{v.linkTitle}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                        :
                        ''
                    }
                    
                </li>
            )
        })

        let teacher = this.state.teacher_links.map((val, key) => {
            return ( 
                <li key={key} className="nav-item sidebar-nav-item">
                    <a href={val.dropdownTitleLink} className="nav-link"><i className={val.icon}></i><span>{val.dropdownTitle}</span></a>
                    {val.dropdowns.length !== 0 ?
                        (
                            <ul className="nav sub-group-menu">
                                {
                                    val.dropdowns.map((v, k) => {
                                        return (
                                            <li key={k} className="nav-item">
                                                <Link to={v.link} className="nav-link"><i className="fas fa-angle-right"></i>{v.linkTitle}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                        :
                        ''
                    }
                    
                </li>
            )
        })

        let student = this.state.student_links.map((val, key) => {
            return ( 
                <li key={key} className="nav-item sidebar-nav-item">
                    <a href={val.dropdownTitleLink} className="nav-link"><i className={val.icon}></i><span>{val.dropdownTitle}</span></a>
                    {val.dropdowns.length !== 0 ?
                        (
                            <ul className="nav sub-group-menu">
                                {
                                    val.dropdowns.map((v, k) => {
                                        return (
                                            <li key={k} className="nav-item">
                                                <Link to={v.link} className="nav-link"><i className="fas fa-angle-right"></i>{v.linkTitle}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                        :
                        ''
                    }
                    
                </li>
            )
        })
        let sidebar_links;

        if (user.is_system_admin) {
            sidebar_links = admin
        } else if (user.is_school_admin) {
            sidebar_links = schooladmin
        } else if (user.is_teacher) {
            sidebar_links = teacher
        } else if (user.is_student) {
            sidebar_links = student
        }

        const sidebar = (
            // <div className="sidebar-main sidebar-menu-one sidebar-expand-md sidebar-color">
            //     <div className="mobile-sidebar-header d-md-none">
            //         <div className="header-logo">
            //             <a href="index.html"><img src="/static/assets/img/logo1.png" alt="logo" /></a>
            //         </div>
            //     </div>
            //     <div className="sidebar-menu-content">
                    
            //         <ul className="nav nav-sidebar-menu sidebar-toggle-view"> 
            //             {sidebar_links}
            //         </ul>
            //     </div>
            // </div>
            <div style={{ width: 256 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}  
                    onOpenChange={this.onOpenChange}
                    // style={{ width: 256 }}
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    {sidebar_links}
                </Menu>
            </div>
        )
    return (
        <Hoc>
            {
            isAuthenticated ? sidebar : ''
            }
        </Hoc>
        
    )
  }
}



