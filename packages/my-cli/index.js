#!/usr/bin/env node
//首行代码含义：使用env来找到node并使用node来作为程序的解释程序
//在env中规定很多系统的环境变量，包括我们安装的一些环境的路径等。
//在不同的操作系统中，我们安装node的路径可能会有所不同，但是其环境变量会存在于env里面，
//所以，这里我们使用env来找到node，并用node作为解释程序。所以，env的主要目的就是让我们的脚本在不同的操作系统上都能够正常的被解释，启动。

const chalk = require('chalk')
const fs = require('fs')
const program = require('commander')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const symbols = require('log-symbols')
const handlebars = require('handlebars')

program
  .version(require('./package').version, '-v, --version')
  .command('init <name>')
  .action(name => {
    console.log(name)
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'author',
          message: '请输入你的名字'
        }
      ])
      .then(answers => {
        console.log(answers.author)
        const lqProcess = ora('正在创建...')
        lqProcess.start()
        download(
          'direct:https://github.com/go-on-the-way/express-mysql-jade.git',
          name,
          { clone: true },
          err => {
            if (err) {
              lqProcess.fail()
              console.log(symbols.error, chalk.red(err))
            } else {
              lqProcess.succeed()
              const fileName = `${name}/package.json`
              const meta = {
                name,
                author: answers.author
              }
              if (fs.existsSync(fileName)) {
                const content = fs.readFileSync(fileName).toString()
                const result = handlebars.compile(content)(meta)
                fs.writeFileSync(fileName, result)
              }
              console.log(symbols.success, chalk.green('创建成功'))
            }
          }
        )
      })
  })
//关闭隐式的帮助命令
program.addHelpCommand(false)
program.parse(process.argv)