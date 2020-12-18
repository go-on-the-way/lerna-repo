const pkg =require('../../package.json')
module.exports = {
  title: pkg.name,
  description: 'starlinke公共库',
  base: '/',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '组件', link: '/lib/index' },
    ],
    sidebar:{
      '/guide/':[
        {
          title:'简介',
          collapsable: false,
          children: [
            {
              title:'介绍',
              path: 'introduction',
              collapsable: false,
            }
          ]
        },
      ],
      '/lib/':[
        {
          title:'UI组件',
          collapsable: false,
          children: [
            {
              title:'poper',
              path: 'poper',
              collapsable: false,
            }
          ]
        }
      ]
    },
    sidebarDepth: 1
  },
  plugins: [
    // 回到顶部
    '@vuepress/back-to-top',

    // 放大
    ['@vuepress/medium-zoom',{selector: 'img'}]
  ]
}
