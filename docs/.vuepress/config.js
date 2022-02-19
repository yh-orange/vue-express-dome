module.exports = {
    title: 'yh-orange 学习笔记',
    description: 'Personal Website',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
        ['link', {rel: 'icon', href: '/images/icon.png'}],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]

    ],
    serviceWorker: true, // 是否开启 PWA
    markdown: {
        extractHeaders: [ 'h2', 'h3', 'h4','h5','h6' ],
        lineNumbers: true // 代码块是否显示行号
    },
    plugins: [['vuepress-plugin-code-copy', {
        align: 'bottom', // top 和 bottom
        staticIcon: true,
        successText: '复制成功'
    }], '@vuepress/plugin-active-header-links'],
    theme: 'reco',
    port: 8888, //  指定 dev server 的端口。
    themeConfig: {
        logo: '/images/hero.jpg',
        author: 'yh-orange',
        valineConfig: {
            appId: 'CB0HAiNw5GUiv2sqoheMPDLy-gzGzoHsz',// your appId
            appKey: 'yI54eHlvB55dsvzwFgVMYdeq', // your appKey
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
        nav: [ // 导航栏配置
            {text: '前端基础资料', link: '/base-js/'},
            {text: 'typeScript', link: '/typeScript/'},
            {text: 'VSCode', link: '/VSCode/'},
            {text: 'ZJ', link: '/ZJ/'},
            {text: 'vue3', link: '/vue3-base/'},
            {text: 'Markdown', link: '/md-study-note/'},
            {text: '自己的网站', link: 'http://120.77.15.133'},
            {text: 'TimeLine', link: '/timeline/', icon: 'reco-date'}
        ],
        displayAllHeaders: false, // 默认值：false
        // sidebar: [
        //     {
        //         title: "前端基础资料",
        //         path: '/base-js/',
        //         collapsable: true, // 不折叠,
        //         sidebarDepth: 5,    // 可选的, 默认值是 1
        //     },
        //     {
        //         title: "Markdown学习笔记",
        //         path: '/md-study-note/',
        //         collapsable: true, // 不折叠
        //         sidebarDepth: 5,    // 可选的, 默认值是 1
        //     }
        // ],
        // subSidebar: 'auto',
        lastUpdated: 'Last Updated', // string | boolean
        sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 3
    },
    configureWebpack: {
        resolve: {
            alias: {}
        }
    },
    base: '/' // 部署到github相关的配置
};