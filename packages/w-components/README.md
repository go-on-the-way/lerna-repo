## 自定义vue组件库
### 环境
#### node + webpack

### 已建组件
SdcCanvas  
SdcCanvasBlock

### 构建
`npm run build //生成dist/w-ui.js文件` 
### 生成示例 
`npm run demo //生成dist/demo目录`
### 组件库使用
#### 1、当作模块使用  
`npm install w-components-x`  
`import {SdcCanvas, SdcCanvasBlock } from 'w-components-x' `  
#### 2、`<script>`引入w-ui.js,前提是先引入vue
```
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script src="w-ui.js"></script>
```
