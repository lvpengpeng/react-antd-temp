import React from 'react'
import { render } from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.less'
render(
    <App/>,
    document.querySelector('#root')
)