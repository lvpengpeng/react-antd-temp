import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router , Route, Switch, Redirect } from 'react-router-dom'
import { mainRoutes } from './routes'
import App from './App'
import './index.less'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
render(
    <LocaleProvider locale={zhCN}>
        <Router>
            <Switch>
                <Route path="/admin" render={(routerProps)=>{
                    {/* 需要登录才能访问admin ,所以用render*/}
                    return <App {...routerProps}/>
                }} />
                
                {
                    mainRoutes.map(route => {
                    return <Route key={route.pathname} path={route.pathname} component={route.component} />
                    })
                }
                <Redirect to="/admin" from="/" exact />
                <Redirect to="/404" />
            </Switch>
        </Router>
    </LocaleProvider>,
    document.querySelector('#root')
)