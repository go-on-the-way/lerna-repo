#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const handlebars = require('handlebars')
const fs = require('fs')

program.usage('<file-name>')

program.on('--help', () => {
    console.log('  Examples:')
    console.log()
    console.log(chalk.gray('    # create a new vue file at current directory'))
    console.log('    $ file-create vue my-vue')
})

function help () {
    program.parse(process.argv)
    if (program.args.length < 1) return program.help()
}
help()

let fileName = program.args[0]
const templatesPath = 'templates'
const content = fs.readFileSync(`${templatesPath}/vue-template.vue`).toString()
const result = handlebars.compile(content)({name:fileName})

fs.writeFileSync(process.cwd()+`/${fileName}.vue`, result)
