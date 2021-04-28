import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import eslint from '@rollup/plugin-eslint';
import { terser } from 'rollup-plugin-terser';
import utils from '../utils/index'
import buildConfig from '../config/build.config'
const rollup = require('rollup');
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')

function getInputOptions() {
  let options = []
  glob.sync(path.resolve(__dirname, '../lib') + '/**/*.js').forEach(filePath => {
    options.push({
      input: filePath,
      external: Object.keys(buildConfig.external),
      plugins: getPlugins()
    })
  })
  return options
}

function getOutputOptions(inputOptions = []) {
  let options = []
  inputOptions.forEach(inputOption => {
    let lastIndex = inputOption.input.lastIndexOf('/')
    let moduleName = inputOption.input.slice(lastIndex + 1).split('.')[0]
    let outputFilename = `${moduleName}.umd.js`

    options.push({
      file: `${buildConfig.outputPath}/${outputFilename}`,
      format: 'umd',
      globals: {
        ...buildConfig.external
      },
      name: moduleName,
      banner: '/*' +
        ` * Copyright © 2020-${new Date().getFullYear()} wlei` +
        ' \n* Released under the ISC License.' +
        ' \n*/\n'
    })
  })
  return options
}

function getPlugins() {
  return [
    nodeResolve(),
    commonjs(),
    // eslint({
    //   throwOnError: true,
    //   throwOnWarning: true,
    //   include: ['lib/**'],
    //   exclude: ['node_modules/**']
    // }),
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      babelHelpers: 'runtime'    // 使plugin-transform-runtime生效
    }),
    // terser()
  ]
}

async function build(inputOptions, outputOptions) {

  for (let i = 0; i < inputOptions.length; i++) {
    console.log(chalk.blue(`正在打包${outputOptions[i].name}...`))
    const bundle = await rollup.rollup(inputOptions[i]);
    await bundle.write(outputOptions[i]);
    console.log(chalk.green(`========打包成功(build success)!=========`))
  }

}

let inputList = getInputOptions()
let outputList = getOutputOptions(inputList)

build(inputList, outputList);