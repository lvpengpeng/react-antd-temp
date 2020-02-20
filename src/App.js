import React, { Component } from 'react'
import './index.less'
import { DatePicker } from 'antd';
import { Button } from 'antd';
import { render } from 'react-dom';

// 添加高阶组件

const testHOC = (WrappenComponent)=>{
  return class HOCComponent extends Component{
    render(){
      return(
        <>
          <WrappenComponent/>
          <div>这个是高阶组件里的信息~~~</div>
        </>
      )
    }
  }
}
@testHOC
class App extends Component {
  render() {
    return (
      <div>
        APP
        <DatePicker />
        <Button type="primary">theme</Button>
      </div>
    )
  }
}
export default App
// export default testHOC(App)