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