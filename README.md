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
npm i antd -D

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