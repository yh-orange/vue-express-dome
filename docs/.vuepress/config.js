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
    plugins: ['cursor-effects',['vuepress-plugin-code-copy', {
        align: 'bottom', // top 和 bottom
        staticIcon: true,
        successText: '复制成功'
    }], '@vuepress/plugin-active-header-links', 'permalink-pinyin', ['autobar', {'pinyinNav': true}]],
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
            {text: '前端基础资料', link: '/base-js/', sidebarDepth: 5},
            {text: 'typeScript', link: '/typeScript/'},
            {text: 'VSCode', link: '/VSCode/'},
            {text: '随笔', link: '/informal-essay/'},
            {text: 'vue3', link: '/vue3-base/'},
            {text: 'Markdown', link: '/md-study-note/'},
            // {text: '自己的网站', link: 'http://120.77.15.133'},
            {text: 'TimeLine', link: '/timeline/', icon: 'reco-date'}
        ],
        displayAllHeaders: false, // 默认值：false
        sidebar: {
            '/base-js': [
                {
                    title:'前端基础资料',
                    collapsable: false,
                    // path: 'base-js',
                    children:[
                        { title: '文档对象模型', path: '/base-js/文档对象模型'},
                        { title: '浏览器对象', path: '/base-js/浏览器对象' },
                        { title: 'javaScript基础知识', path: '/base-js/javaScript基础知识' },
                        { title: 'ES6-ES12特性总结', path: '/base-js/ES6-ES12特性总结' },
                        { title: 'HTTP 相关知识', path: '/base-js/HTTP相关知识' },
                        { title: '浏览器对象', path: '/base-js/浏览器对象' }
                        // { title: '第三节', path: '/study/study03' }
                        // '/base-js/javaScript基础知识',
                        // '/base-js/javaScript基础知识',
                        // '/base-js/文档对象模型',
                        // '/base-js/浏览器对象',
                    ]
                }
                ]
        },
        subSidebar: 'auto',
        lastUpdated: 'Last Updated', // string | boolean
        // sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 5
    },
    configureWebpack: {
        resolve: {
            alias: {}
        }
    },
    base: '/' // 部署到github相关的配置
};
