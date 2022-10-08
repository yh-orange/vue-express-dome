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
            {text: 'vue相关知识', link: '/vue-base/vue3'},
            {text: 'Markdown', link: '/md-study-note/'},
            {text: '前端工程化', link: '/front-end-engineering/'},
            {text: 'Node', link: '/node/'},
            {text: 'Web安全问题', link: '/web-security-problem/base'},
            {text: 'photoStudy', link: '/photo-study/'},
            {text: 'ps', link: '/ps/quick'},
            {text: 'es', link: '/es/'},
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
                        // { title: 'Nginx相关知识', path: '/base-js/Nginx' },
                        { title: 'git基本操作', path: '/base-js/git' }
                        // { title: '第三节', path: '/study/study03' }
                        // '/base-js/javaScript基础知识',
                        // '/base-js/javaScript基础知识',
                        // '/base-js/文档对象模型',
                        // '/base-js/浏览器对象',
                    ]
                }
            ],
            '/front-end-engineering': [
                {
                    title:'前端工程化',
                    collapsable: false,
                    children:[
                        { title: 'webpack', path: '/front-end-engineering/webpack'},
                        { title: '前端错误监控体系搭建', path: '/front-end-engineering/前端错误监控体系搭建'},
                        { title: 'nginx', path: '/front-end-engineering/nginx'},
                        { title: 'Babel', path: '/front-end-engineering/Babel'},
                        { title: '前端mock数据', path: '/front-end-engineering/mock'},
                        { title: '微应用', path: '/front-end-engineering/microApplication'},
                        { title: 'js模块化', path: '/front-end-engineering/js模块化'},
                        { title: '前端轻量自动化构建方案', path: '/front-end-engineering/前端轻量自动化构建方案'},
                        { title: '前端代码规范', path: '/front-end-engineering/前端代码规范'},
                        { title: '前端单元测试', path: '/front-end-engineering/前端单元测试'},
                        { title: 'docker', path: '/front-end-engineering/docker'}
                    ]
                }
            ],
            '/informal-essay': [
                {
                    title:'随笔-零碎学习记录',
                    collapsable: false,
                    children:[
                        { title: '前端奇奇怪怪的技术', path: '/informal-essay/前端奇奇怪怪的技术'}
                    ]
                }
            ],
            '/web-security-problem': [
                {
                    title:'Web安全问题',
                    collapsable: false,
                    children:[
                        { title: 'XSS 攻击', path: '/web-security-problem/xss'},
                        { title: 'CSRF 攻击', path: '/web-security-problem/csrf' },
                        { title: 'JavaScript 混淆安全加固', path: '/web-security-problem/javascript' }
                    ]
                }
            ],
            '/vue-base': [
                {
                    title:'vue相关知识',
                    collapsable: false,
                    children:[
                        { title: 'vue3', path: '/vue-base/vue3'},
                        { title: 'jsx', path: '/vue-base/jsx'}
                    ]
                }
            ],
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
