import React, { Component } from 'react'
import './app.css'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import {Switch, Route, Link} from 'react-router-dom'

import {Home} from '../home/home'
import {QuestionList} from '../question-list/question-list'

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
              <Menu.Item key="1">题库管理</Menu.Item>
              <Menu.Item key="2">考试管理</Menu.Item>
            </SubMenu>
            <Menu.Item key="3">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/question/list' component={QuestionList}/>
              </Switch>
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
