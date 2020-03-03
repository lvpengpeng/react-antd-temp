import { adminRoutes } from '../../routes'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon ,Dropdown ,Avatar ,Badge} from 'antd';
import './index.less'
const menus = adminRoutes.filter(route => route.isNav === true)
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const menu = (
  <Menu>
    <Menu.Item>
      <Badge dot>
          通知中心
      </Badge>
    </Menu.Item>
    <Menu.Item>
        个人设置
    </Menu.Item>
    <Menu.Item>
        退出
    </Menu.Item>
  </Menu>
);


// 添加布局组件
@withRouter
class Frame extends Component {
    onMenuClick = ({key}) => {
        // console.log(this.props);
        
        this.props.history.push(key)
      }
    renderDropdown (){
    return (
        <Menu onClick={this.onDropdownMenuClick}>
          <Menu.Item
           key="/admin/notifications">
            <Badge dot>
                通知中心
            </Badge>
          </Menu.Item>
          <Menu.Item
           key="/admin/profile">
              个人设置
          </Menu.Item>
          <Menu.Item
           key="/logout">
              退出
          </Menu.Item>
        </Menu>
      )   
    }
    // onDropdownMenuClick 可以拿到Menu.Item里面的属性
    onDropdownMenuClick = ({ key }) => {
      this.props.history.push(key)
    }
    render() {
        return (
            <Layout style={{minHeight:'100%'}}>
            <Header className="header header-wrap" style={{backgroundColor: "#ccc"}}>
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
              <div>

              
            <Dropdown overlay={this.renderDropdown()} >
                <div className="ant-dropdown-link" style={{display: 'flex', alignItems: 'center'}} onClick={e => e.preventDefault()}>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />  
                   <span>欢迎 lee</span>
                   <Badge count={33} offset={[14, -10]}>
                      <Icon type="down" />
                  </Badge>
                </div>
            </Dropdown>
            </div>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  onClick={this.onMenuClick}
                  style={{ height: '100%', borderRight: 0 }}
                  selectedKeys={[this.props.location.pathname]}
                  // this.props.location.pathname是当前页面的url地址
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
              <Layout style={{ padding: '20px' }}>
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
export default Frame