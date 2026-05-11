module.exports = {
  title: "yh-orange 学习笔记",
  description: "Personal Website",
  head: [
    ["link", { rel: "icon", href: "/images/icon.png" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  serviceWorker: true,
  markdown: {
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"],
    lineNumbers: true,
  },
  plugins: [
    "cursor-effects",
    [
      "vuepress-plugin-code-copy",
      {
        align: "bottom",
        staticIcon: true,
        successText: "复制成功",
      },
    ],
    "@vuepress/plugin-active-header-links",
    "permalink-pinyin",
    ["autobar", { pinyinNav: true }],
  ],
  theme: "reco",
  port: 8888,
  themeConfig: {
    logo: "/images/hero.jpg",
    author: "yh-orange",
    valineConfig: {
      appId: "CB0HAiNw5GUiv2sqoheMPDLy-gzGzoHsz",
      appKey: "yI54eHlvB55dsvzwFgVMYdeq",
    },
    nav: [
      { text: "前端基础资料", link: "/base-js/", sidebarDepth: 5 },
      { text: "随笔", link: "/informal-essay/" },
      { text: "前端工程化", link: "/front-end-engineering/" },
      { text: "拍照修图", link: "/ps/" },
      { text: "其他资料", link: "/other/" },
      { text: "小程序资料", link: "/mini-program/" },
      { text: "TimeLine", link: "/timeline/", icon: "reco-date" },
    ],
    displayAllHeaders: false,
    sidebar: {
      "/base-js": [
        {
          title: "前端基础资料",
          collapsable: false,
          children: [
            { title: "html+css+js", path: "/base-js/01" },
            { title: "文档对象模型", path: "/base-js/02" },
            { title: "浏览器对象", path: "/base-js/03" },
            { title: "javaScript基础知识", path: "/base-js/04" },
            { title: "ES6-ES12特性总结", path: "/base-js/05" },
            { title: "HTTP 相关知识", path: "/base-js/06" },
            { title: "git基本操作", path: "/base-js/git" },
            { title: "es", path: "/base-js/es" },
            { title: "Node", path: "/base-js/node" },
            {
              title: "webpack相关知识",
              collapsable: false,
              path: "/base-js/webpack/",
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
            { title: "前端错误监控体系搭建", path: "/front-end-engineering/01" },
            { title: "nginx", path: "/front-end-engineering/nginx" },
            { title: "Babel", path: "/front-end-engineering/babel" },
            { title: "前端mock数据", path: "/front-end-engineering/mock" },
            { title: "微应用", path: "/front-end-engineering/micro-application" },
            { title: "js模块化", path: "/front-end-engineering/02" },
            { title: "前端轻量自动化构建方案", path: "/front-end-engineering/03" },
            { title: "前端代码规范", path: "/front-end-engineering/04" },
            { title: "前端单元测试", path: "/front-end-engineering/05" },
            { title: "桌面应用electron", path: "/front-end-engineering/electron" },
            { title: "typeScript", path: "/front-end-engineering/type-script" },

            // ------------ 修复 1 ------------
            {
              title: "vue相关知识",
              path: "/front-end-engineering/vue-base/",
              collapsable: false,
              children: [
                { title: "vue3", path: "/front-end-engineering/vue-base/vue3" },
                { title: "vue3相关技巧整理", path: "/front-end-engineering/vue-base/01" },
                { title: "jsx", path: "/front-end-engineering/vue-base/jsx" },
              ],
            },

            // ------------ 修复 2 ------------
            {
              title: "Web安全问题",
              path: "/front-end-engineering/web-security-problem/",
              collapsable: false,
              children: [
                { title: "XSS 攻击", path: "/front-end-engineering/web-security-problem/xss" },
                { title: "CSRF 攻击", path: "/front-end-engineering/web-security-problem/csrf" },
                { title: "JavaScript 混淆安全加固", path: "/front-end-engineering/web-security-problem/javascript" },
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
            { title: "前端奇奇怪怪的技术", path: "/informal-essay/01" },
            { title: "面试题", path: "/informal-essay/02" },
            { title: "喜欢的文字", path: "/informal-essay/03" },
            { title: "Markdown基础使用", path: "/informal-essay/md-study-note/" },
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
      "/other": [
        {
          title: "其他资料",
          collapsable: false,
          children: [
            { title: "React", path: "/other/react" },
            { title: "React Hooks", path: "/other/react-hooks" },
            { title: "React Router", path: "/other/react-router" },
            { title: "Angular", path: "/other/angular" },
            { title: "Rxjs", path: "/other/rxjs" },
            { title: "Python", path: "/other/python" },
            { title: "eslint_prettier", path: "/other/eslint_prettier" },
            { title: "Zustand", path: "/other/zustand" },
            { title: "Network", path: "/other/network" },
            // { title: "Next", path: "/other/next" },
            {
              title: "webpack相关知识",
              collapsable: false,
              path: "/other/next/",
              children: [
                { title: "第一章到第八章", path: "/other/next/01" },
                { title: "第九章到第十四章", path: "/other/next/02" },
                { title: "第十五章到第二十章", path: "/other/next/03" },
                { title: "剩余章节", path: "/other/next/04" },
              ],
            },
          ],
        },
      ],
    },
    subSidebar: "auto",
    lastUpdated: "Last Updated",
    sidebarDepth: 5,
  },
  configureWebpack: {
    resolve: {
      alias: {},
    },
  },
  base: "/",
};