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
