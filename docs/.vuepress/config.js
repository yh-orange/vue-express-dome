module.exports = {
  title: "yh-orange 学习笔记",
  description: "Personal Website",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/images/icon.png" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  serviceWorker: true, // 是否开启 PWA
  markdown: {
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"],
    lineNumbers: true, // 代码块是否显示行号
  },
  plugins: [
    "cursor-effects",
    [
      "vuepress-plugin-code-copy",
      {
        align: "bottom", // top 和 bottom
        staticIcon: true,
        successText: "复制成功",
      },
    ],
    "@vuepress/plugin-active-header-links",
    "permalink-pinyin",
    ["autobar", { pinyinNav: true }],
  ],
  theme: "reco",
  port: 8888, //  指定 dev server 的端口。
  themeConfig: {
    logo: "/images/hero.jpg",
    author: "yh-orange",
    valineConfig: {
      appId: "CB0HAiNw5GUiv2sqoheMPDLy-gzGzoHsz", // your appId
      appKey: "yI54eHlvB55dsvzwFgVMYdeq", // your appKey
    },
    // 博客配置
    // blogConfig: {
    //     category: {
    //         location: 2,     // 在导航栏菜单中所占的位置，默认2
    //         text: 'Category' // 默认文案 “分类”
    //     },
    //     tag: {
    //         location: 3,     // 在导航栏菜单中所占的位置，默认3
    //         text: 'Tag'      // 默认文案 “标签”
    //     },
    //     socialLinks: [     // 信息栏展示社交信息
    //         { icon: 'reco-github', link: 'https://github.com/recoluan' },
    //         { icon: 'reco-npm', link: 'https://www.npmjs.com/~reco_luan' }
    //     ]
    // },
    nav: [
      // 导航栏配置
      { text: "前端基础资料", link: "/base-js/", sidebarDepth: 5 },
      { text: "随笔", link: "/informal-essay/" },
      { text: "前端工程化", link: "/front-end-engineering/" },
      { text: "拍照修图", link: "/ps/" },
      { text: "angular", link: "/angular/" },
      { text: "小程序资料", link: "/mini-program/" },
      // {text: '自己的网站', link: 'http://120.77.15.133'},
      { text: "TimeLine", link: "/timeline/", icon: "reco-date" },
    ],
    displayAllHeaders: false, // 默认值：false
    sidebar: {
      "/base-js": [
        {
          title: "前端基础资料",
          collapsable: false,
          // path: 'base-js',
          children: [
            { title: "html+css+js", path: "/base-js/html+css+js" },
            { title: "文档对象模型", path: "/base-js/文档对象模型" },
            { title: "浏览器对象", path: "/base-js/浏览器对象" },
            {
              title: "javaScript基础知识",
              path: "/base-js/javaScript基础知识",
            },
            { title: "ES6-ES12特性总结", path: "/base-js/ES6-ES12特性总结" },
            { title: "HTTP 相关知识", path: "/base-js/HTTP相关知识" },
            { title: "git基本操作", path: "/base-js/git" },
            { title: "es", path: "/base-js/es" },
            { title: "Node", path: "/base-js/node" },
            {
              title: "webpack相关知识",
              collapsable: false,
              children: [
                { title: "webpack的基础介绍", path: "/base-js/webpack/basic" },
                { title: "自定义脚手架", path: "/base-js/webpack/custom" },
              ],
            },
          ],
        },
      ],
      "/front-end-engineering": [
        {
          title: "前端工程化",
          collapsable: false,
          children: [
            { title: "webpack", path: "/front-end-engineering/webpack" },
            {
              title: "前端错误监控体系搭建",
              path: "/front-end-engineering/前端错误监控体系搭建",
            },
            { title: "nginx", path: "/front-end-engineering/nginx" },
            { title: "Babel", path: "/front-end-engineering/Babel" },
            { title: "前端mock数据", path: "/front-end-engineering/mock" },
            {
              title: "微应用",
              path: "/front-end-engineering/microApplication",
            },
            { title: "js模块化", path: "/front-end-engineering/js模块化" },
            {
              title: "前端轻量自动化构建方案",
              path: "/front-end-engineering/前端轻量自动化构建方案",
            },
            {
              title: "前端代码规范",
              path: "/front-end-engineering/前端代码规范",
            },
            {
              title: "前端单元测试",
              path: "/front-end-engineering/前端单元测试",
            },
            {
              title: "桌面应用electron",
              path: "/front-end-engineering/electron",
            },
            {
              title: "typeScript",
              path: "/front-end-engineering/typeScript",
            },
            {
              title: "vue相关知识",
            //   path: "/front-end-engineering/vue-base/",
              collapsable: false,
              children: [
                { title: "vue3", path: "/front-end-engineering/vue-base/vue3" },
                {
                  title: "vue3相关技巧整理",
                  path: "/front-end-engineering/vue-base/vue3相关技巧整理",
                },
                { title: "jsx", path: "/front-end-engineering/vue-base/jsx" },
              ],
            },
            {
              title: "Web安全问题",
            //   path: "/front-end-engineering/web-security-problem/",
              collapsable: false,
              children: [
                {
                  title: "XSS 攻击",
                  path: "/front-end-engineering/web-security-problem/xss",
                },
                {
                  title: "CSRF 攻击",
                  path: "/front-end-engineering/web-security-problem/csrf",
                },
                {
                  title: "JavaScript 混淆安全加固",
                  path: "/front-end-engineering/web-security-problem/javascript",
                },
              ],
            },
            { title: "docker", path: "/front-end-engineering/docker" },
          ],
        },
      ],
      "/informal-essay": [
        {
          title: "随笔-零碎学习记录",
          collapsable: false,
          children: [
            { title: "零碎", path: "/informal-essay/" },
            {
              title: "前端奇奇怪怪的技术",
              path: "/informal-essay/前端奇奇怪怪的技术",
            },
            { title: "面试题", path: "/informal-essay/面试题" },
            { title: "喜欢的文字", path: "/informal-essay/喜欢的文字" },
            {
              title: "Markdown基础使用",
              path: "/informal-essay/md-study-note/",
            },
          ],
        },
      ],
      "/ps": [
        {
          title: "拍照修图",
          collapsable: false,
          children: [
            { title: "照相基础", path: "/ps/photo-study" },
            { title: "修图基础", path: "/ps/quick" },
          ],
        },
      ],
      "/mini-program": [
        {
          title: "小程序相关知识",
          collapsable: false,
          children: [
            { title: "小程序基础", path: "/mini-program/01" },
            { title: "小程序配置文件", path: "/mini-program/02" },
            { title: "小程序样式与组件", path: "/mini-program/03" },
            { title: "小程序事件系统", path: "/mini-program/04" },
            { title: "小程序模板语法", path: "/mini-program/05" },
            { title: "小程序生命周期", path: "/mini-program/06" },
            { title: "小程序原生 API", path: "/mini-program/07" },
            { title: "小程序自定义组件", path: "/mini-program/08" },
            { title: "小程序 npm 使用", path: "/mini-program/09" },
            { title: "小程序分包加载", path: "/mini-program/10" },
            { title: "小程序开放能力", path: "/mini-program/11" },
            { title: "小程序补充与拓展", path: "/mini-program/12" },
            { title: "上线发布", path: "/mini-program/13" },
          ],
        },
      ],
      "/angular": [
        {
          title: "angular",
          collapsable: false,
          children: [
            { title: "angular", path: "/angular/angular" },
            { title: "Rxjs", path: "/angular/Rxjs" },
          ],
        },
      ],
    },
    subSidebar: "auto",
    lastUpdated: "Last Updated", // string | boolean
    // sidebar: 'auto', // 侧边栏配置
    sidebarDepth: 5,
  },
  configureWebpack: {
    resolve: {
      alias: {},
    },
  },
  base: "/", // 部署到github相关的配置
};
