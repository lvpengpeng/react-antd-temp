import React, { Component } from 'react'
import './index.less'
import { DatePicker } from 'antd';
import { Button } from 'antd';
import { render } from 'react-dom';
import { adminRoutes } from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Frame } from './components'
class App extends Component {
  render() {
    return (
      <Frame>
          <Switch>
          {
            adminRoutes.map(route=>{
              return  <Route key={route.pathname} exact={route.exact} path= {route.pathname} render={(routerProps)=>{
                return <route.component {...routerProps} />
              }}/>
            })
          }
            <Redirect to={adminRoutes[0].pathname} from='/admin' exact />
            {/* 当访问/admin的时候，直接重定向到 /admin/dashboard  */}
            <Redirect to="/404" />
          </Switch>
      </Frame>
    )
  }
}
export default App
// export default testHOC(App)