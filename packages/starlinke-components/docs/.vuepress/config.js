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
    sidebarDepth: 4
  },
  plugins: [
    // 回到顶部
    '@vuepress/back-to-top',

    // 放大
    ['@vuepress/medium-zoom',{selector: 'img'}]
  ]
}
