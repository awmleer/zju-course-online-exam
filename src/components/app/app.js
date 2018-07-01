import React, { Component } from 'react'
import './app.scss'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import {Routes} from '../routes/routes'
import {Link} from 'react-router-dom'
import * as api from '../../api'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu


class App extends Component {

  constructor(props){
    super(props)
    api.get(`/account/profile`).then((data) => {
      console.log(data)
      this.setState({
        user: data
      })
    })
  }

  state = {
    user: null
  }


  changeUser = (data)=>{
    return () => {
      api.post(`/account/fake-login/`, data).then(() => {
        window.location = '/'
      })
    }
  }

  render() {
    let header
    if(this.state.user){
      header = (
        <span>{this.state.user.name}</span>
      )
    }else{
      header = ''
    }
    return (
      <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} id="sider">
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <SubMenu key="sub1" title={<span><Icon type="edit" /><span>在线测试</span></span>}>
              <Menu.Item key="home">
                <Link to='/home'>首页</Link>
              </Menu.Item>
              {
                this.state.user && this.state.user.type === 'teacher' &&
                  <Menu.Item key="question-list">
                    <Link to='/question/list'>题目管理</Link>
                  </Menu.Item>
              }
              {
                this.state.user && this.state.user.type === 'teacher' &&
                <Menu.Item key="question-group-list">
                  <Link to='/question-group/list'>题目组管理</Link>
                </Menu.Item>
              }
              {
                this.state.user && this.state.user.type === 'teacher' &&
                <Menu.Item key="exam-list">
                  <Link to='/exam/list'>考试管理</Link>
                </Menu.Item>
              }
              {
                this.state.user && this.state.user.type === 'student' &&
                <Menu.Item key="exam-list">
                  <Link to='/exam/list' type='student'>考试列表</Link>
                </Menu.Item>
              }
            </SubMenu>
            <Menu.Item key="3">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
          <Header style={{ background: '#fff', padding: '0 20px', textAlign: 'right' }}>
            <a onClick={this.changeUser({id:1, type:'student', name:'测试学生'})} style={{marginRight:10}}>切换为学生账号</a>
            <a onClick={this.changeUser({id:2, type:'teacher', name:'测试教师'})} style={{marginRight:10}}>切换为教师账号</a>
            {header}
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff' }}>
              <Routes/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default App
