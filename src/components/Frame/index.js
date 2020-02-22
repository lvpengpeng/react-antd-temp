import { adminRoutes } from '../../routes'

import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './index.less'
const menus = adminRoutes.filter(route => route.isNav === true)
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


// 添加布局组件
export default class Frame extends Component {
    render() {
        return (
            <Layout>
            <Header className="header" style={{backgroundColor: "#ccc"}}>
              <div className="logo logo-img"/>
              {/* <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
              </Menu> */}
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                //   defaultSelectedKeys={['1']}
                //   defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        menus.map((item)=>{
                            return (
                                <Menu.Item  key={item.pathname}>
                           
                                    <Icon type={item.icon}/>
                                    {item.title}
                            
                              </Menu.Item> 
                            )
                        })
                    }
                  {/* <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="laptop" />
                        subnav 2
                      </span>
                    }
                  >
                  </SubMenu>
                  <SubMenu
                    key="sub3"
                    title={
                      <span>
                        <Icon type="notification" />
                        subnav 3
                      </span>
                    }
                  >
                  </SubMenu> */}
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )
    }
}
