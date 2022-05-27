const inquirer = require('inquirer');// ⼀个⽤户与命令⾏交互的⼯具
const { resolve } = require('path');
const { existsSync, readFileSync } = require('fs');
const ejs = require('ejs');

const {
  camelCaseToHyphen,
  generateFile
} = require('../utils');
const prompt = inquirer.prompt;
let filepath = '';
let fileName = ''; // 文件名称

const generateCreatePage = () => {
  const createTempPath = `./template/create.ejs`;
  const ejsParams = {
    param: '传的参数'
  };
  const content = ejs.render(readFileSync(createTempPath, 'utf8'), ejsParams);

  generateFile(`${filepath}/index.tsx`, content);
};

const generateFiles = () => {
  generateCreatePage();
};

const run = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: '文件名称',
      validate: val => {
        if (/^[a-zA-z]/.test(val)) {
          const dirName = `${camelCaseToHyphen(val.trim())}`;
          const fullPath = resolve(`./dist/${dirName}`);

          return existsSync(fullPath)
            ? console.log(`该目录已存在`)
            : true;
        }
        return '请输入有效名称';
      },
    },
    {
      type: 'confirm',
      name: 'isGenerate',
      message: '是否生成',
      default: true,
    },
  ]).then(answers => {
    const {
      name,
      isGenerate,
    } = answers;
    if (isGenerate) {
      fileName = camelCaseToHyphen(name.trim());
      filepath = resolve(`./dist/${fileName}`);
      generateFiles();
    }
  });
};

run();
