#!/usr/bin/env node
//首行代码含义：使用env来找到node并使用node来作为程序的解释程序
//在env中规定很多系统的环境变量，包括我们安装的一些环境的路径等。
//在不同的操作系统中，我们安装node的路径可能会有所不同，但是其环境变量会存在于env里面，
//所以，这里我们使用env来找到node，并用node作为解释程序。所以，env的主要目的就是让我们的脚本在不同的操作系统上都能够正常的被解释，启动。

const program = require('commander')

program
  .version(require('./package').version)
  .usage('<command> [options]')
  .command('vue', 'generate a vue file',{ executableFile: './bin/create-vue' })


program.parse(process.argv)