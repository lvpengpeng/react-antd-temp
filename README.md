# 安装脚手架
1，
```
npx create-react-app my-app
cd my-app
npm run start
启动。
   ```
2.
把src里的文件都删除
新建 index.js 内容如下
```
import React from 'react'
import { render } from 'react-dom'
import App from './App'

render(
    <App/>,
    document.querySelector('#root')
)

```
新建App.js 内容如下
```
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        APP
      </div>
    )
  }
}

```
启动npm run start 即可 运行

# 配置antd
#### 一，
参考 https://ant.design/docs/react/use-with-create-react-app-cn 里面的高级配置
1,cnpm i react-app-rewired customize-cra -D,
2,然后在项目根目录创建一个`config-overrides.js`用于修改默认配置。
3.修改package.json里把react-scripts修改成react-app-rewired
```
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```
#### 二，安装antd
```
npm i antd -S

```
#### 三，添加less
1.npm i less less-loader -D
2.修改config-overrides.js
添加addLessLoader
```
 const { override,addLessLoader} = require('customize-cra');

 module.exports = override(
    addLessLoader({
        javascriptEnabled: true
    }),
 );
```
#### 四，配置antd，可以修改主题
安装
```
cnpm i babel-plugin-import -D
```
修改config-overrides.js文件，添加 fixBabelImports，如下。
```
 const { override,addLessLoader,fixBabelImports} = require('customize-cra');
const modifyVars= require('./theme.js')
 module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //加载原生less文件
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars
    }),
 );
```
新建theme.js文件存放自定义主题配置信息
如：
```
module.exports={
    '@primary-color':'pink',// 全局主色 （修改全局的颜色为粉色）
    '@link-color':' #1890ff; ',// 链接色
    '@success-color':' #52c41a; ',// 成功色
    '@warning-color':' #faad14; ',// 警告色
    '@error-color':' #f5222d; ',// 错误色
    '@font-size-base':' 14px; ',// 主字号
    '@heading-color':' rgba(0, 0, 0, 0.85); ',// 标题色
    '@text-color':' rgba(0, 0, 0, 0.65); ',// 主文本色
    '@text-color-secondary ':' rgba(0, 0, 0, .45); ',// 次文本色
    '@disabled-color ':' rgba(0, 0, 0, .25); ',// 失效色
    '@border-radius-base':' 4px; ',// 组件/浮层圆角
    '@border-color-base':' #d9d9d9; ',// 边框色
    '@box-shadow-base':' 0 2px 8px rgba(0, 0, 0, 0.15); ',// 浮层阴影
}
```
定义const modifyVars= require('./theme.js')
修改config-overrides.js里的addLessLoader，添加modifyVars。
引入一个button组件，重启项目后可看到主题颜色。
修改配置之后重新启动项目，npm run start。可看主题修改完成。
#### 五，添加装饰器写法的支持
1，在app.js里添加高阶组件
app.js如：
```
import React, { Component, createContext } from 'react'
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
          <div>这个是高阶组件里的信息</div>
        </>
      )
    }
  }
}
class App extends Component {
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
export default testHOC(App)
```
2,添加装饰器写法
2.1访问https://www.npmjs.com/package/customize-cra
修改config-overrides.js。引入addDecoratorsLegacy，使用addDecoratorsLegacy。
config-overrides.js如下：
```
 const { override,addLessLoader,fixBabelImports,addDecoratorsLegacy} = require('customize-cra');
const modifyVars= require('./theme.js')
 module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true, //加载原生less文件
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars
    }),
    addDecoratorsLegacy()
 );
```
2.2使用@babel/plugin-proposal-decorators这个专门用于转换装饰器代码的插件
安装npm i @babel/plugin-proposal-decorators -D
2.3把index.js文件修改成装饰器写法
如：
```
import React, { Component} from 'react'
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
          <div>这个是高阶组件里的信息</div>
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
```
重启运行，即可。

#### 六. 添加时间处理函数库momentjs
 地址http://momentjs.cn/
 安装 npm i moment -S
 

 #### 七，安装导出Excel文档插件
 安装 cnpm i xlsx -S
 使用参考 地址 https://www.npmjs.com/package/xlsx

  #### 八，安装富文本编辑器
 cnpm install wangeditor -S
  使用参考 地址 https://www.kancloud.cn/wangfupeng/wangeditor3/335769