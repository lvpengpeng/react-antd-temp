import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router , Route, Switch, Redirect } from 'react-router-dom'
import { mainRoutes } from './routes'
import App from './App'
import './index.less'

render(
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
    </Router>,
    document.querySelector('#root')
)