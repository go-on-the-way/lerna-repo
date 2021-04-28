### rollup 插件

rollup-plugin-vue 读取/解析 vue 单文件

- vue-runtime-helpers 打包后的 vue 组件会产生被 normalizeComponent 包裹

### 组件开发步骤

1. 在 packages 目录下新增自己的组件目录和相关文件
2. 修改 src/index.js 文件
3. 修改 components.js
4. 如果组件有依赖第三方包,要修改文件 config\index.js,如果是要用户自己提前安装的包，则要将包的版本信息放在 package.json 的 peerDependencies 字段中
5. 注意代码提交规范 详见：commitlint.config.js
