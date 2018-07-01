import React, { Component } from 'react'
import './app.scss'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import {Routes} from '../routes/routes'
import {Link} from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu


class App extends Component {
  state = {
    collapsed: false,
  }
  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  render() {
    return (
      <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} id="sider">
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <SubMenu key="sub1" title={<span><Icon type="edit" /><span>在线测试</span></span>}>
              <Menu.Item key="home">
                <Link to='/home'>首页</Link>
              </Menu.Item>
              <Menu.Item key="question-list">
                <Link to='/question/list'>题目管理</Link>
              </Menu.Item>
              <Menu.Item key="question-group-list">
                <Link to='/question-group/list'>题目组管理</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to='/exam/list'>考试管理</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="3">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
          <Header style={{ background: '#fff', padding: 0 }} />
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
