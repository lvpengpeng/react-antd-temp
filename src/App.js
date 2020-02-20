import React, { Component } from 'react'
import './index.less'
import { DatePicker } from 'antd';
import { Button } from 'antd';
export default class App extends Component {
  render() {
    return (
      <div>
        APP
        <DatePicker />
        <Button type="primary">theme</Button>
        <p>33</p>
      </div>
    )
  }
}
