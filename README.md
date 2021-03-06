# lerna-repo

### 初始化 lerna 项目

```
lerna init --independent //独立模式(Independent mode)，每一个包有一个独立的版本号
```

### 安装所有 packages 的依赖

```
lerna bootstrap
```

### 模块安装依赖

```
lerna add module-1 --scope=module-2 //将 module-1 安装到 module-2
lerna add module-1 --scope=module-2 --dev // 将module-1安装到module-2的 devDependencies下
lerna add module-1 // 将module-1 安装到除 module-1 以外的所有模块
lerna add babel-core // 将babel-core 安装到所有模块
```

### 卸载依赖

```
lerna exec --scope=starlinke-utils npm uninstall axios // 将starlinke-utils包下的axios卸载
```

### 检查包是否发生变更

```
lerna updated
```

### 运行各包的脚本

```
lerna run xxx
// 例
lerna run --scope starlinke-utils test //运行 starlinke-utils 模块下的 test

```

### 发布各包

```
lerna publish //当所有模块都需发布时才执行此命令,否则在各自的模块目录下执行 npm publish进行发布
```
