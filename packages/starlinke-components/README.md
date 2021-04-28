# starlinke-components

## 安装

```
npm install starlinke-components --save
```

## 使用

### 全局引用

```
import Vue from 'vue'
import ElementUI from 'element-ui'
import StarlinkeLib from 'starlinke-components' //依赖vue和element-ui

Vue.use(ElementUI, { size: 'small' })
Vue.use(StarlinkeLib)

```

### 按需引用

#### 方法一

1. 安装 babel-plugin-import  
   `npm install babel-plugin-import -D`
2. 修改 babel 配置

```
module.exports = {
  ....
  plugins:[
    [  'import',
      {
        // 组件库的名字,可以根据你发布的库的package.json的name自行更改
        libraryName: 'starlinke-components',

        // 默认打包是lib,不用更改
        libraryDirectory: 'lib',

        // 如果有样式文件,因为打包后样式统一放在/lib/theme下,所以需要稍微转换下
        style: (name, file) => {
          const libDirIndex = name.lastIndexOf('/')
          const libDir = name.substring(0, libDirIndex)
          const fileName = name.substr(libDirIndex + 1)
          return `${libDir}/theme/${fileName}.css`;
        }
      }
    ]
  ]
}
```

3. 结果

```
import { SlFieldBatchInput } from 'starlinke-components'
//会转换成下面的代码
import SlFieldBatchInput from 'starlinke-components/lib/SlFieldBatchInput.js'
import 'starlinke-components/lib/theme/SlFieldBatchInput.css'
```

#### 方法二

```
import SlFieldBatchInput from 'starlinke-components/lib/SlFieldBatchInput.js'
import 'starlinke-components/lib/theme/SlFieldBatchInput.css'
```
