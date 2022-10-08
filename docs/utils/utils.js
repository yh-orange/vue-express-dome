/**
 *校验数据类型
 * typeOf('树哥')  // string
 * typeOf([])  // array
 * typeOf(new Date())  // date
 * typeOf(null) // null
 * typeOf(true) // boolean
 * typeOf(() => { }) // function
 */
export const typeOf = function(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
};

/**
 *防抖
 */
export const debounce = (() => {
    let timer = null
    return (callback, wait = 800) => {
        timer&&clearTimeout(timer)
        timer = setTimeout(callback, wait)
    }
})();

/**
 *节流
 */
export const throttle = (() => {
    let last = 0
    return (callback, wait = 800) => {
        let now = +new Date()
        if (now - last > wait) {
            callback()
            last = now
        }
    }
})();

/**
 * 手机号脱敏
 */
export const hideMobile = (mobile) => {
    return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
};

/**
 * 开启全屏
 */
export const launchFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen()
    }
};

/**
 * 关闭全屏
 */
export const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
};

/**
 * 关闭全屏
 * @param {string} str 待转换的字符串
 * @return {number} type type 1-全大写 2-全小写 3-首字母大写
 */
export const turnCase = (str, type) => {
    switch (type) {
        case 1:
            return str.toUpperCase()
        case 2:
            return str.toLowerCase()
        case 3:
            //return str[0].toUpperCase() + str.substr(1).toLowerCase() // substr 已不推荐使用
            return str[0].toUpperCase() + str.substring(1).toLowerCase()
        default:
            return str
    }
};

/**
* turnCase('vue', 1) // VUE
*turnCase('REACT', 2) // react
* turnCase('vue', 3) // Vue
*/

/**
 * 解析URL参数
 */
export const getSearchParams = () => {
    const searchPar = new URLSearchParams(window.location.search)
    const paramsObj = {}
    for (const [key, value] of searchPar.entries()) {
        paramsObj[key] = value
    }
    return paramsObj
};

/**
 *判断手机是Andoird还是IOS
 */
/**
 * 1: ios
 * 2: android
 * 3: 其它
 */
export const getOSType=() => {
    let u = navigator.userAgent, app = navigator.appVersion;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        return 1;
    }
    if (isAndroid) {
        return 2;
    }
    return 3;
};

/**
 *数组对象根据字段去重
 * @param {array} arr 原数组
 * @param {string} key 原数组
 */
export const uniqueArrayObject = (arr = [], key = 'id') => {
    if (arr.length === 0) return
    let list = []
    const map = {}
    arr.forEach((item) => {
        if (!map[item[key]]) {
            map[item[key]] = item
        }
    })
    list = Object.values(map)

    return list
};

/**
 *滚动到页面顶部
 */
export const scrollToTop = () => {
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    if (height > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, height - height / 8);
    }
};

/**
 *滚动到元素位置
 * @param {string} element 原数组
 */
export const smoothScroll = element =>{
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
};

/**
 *uuid 随机数
 */
export const uuid = () => {
    const temp_url = URL.createObjectURL(new Blob())
    const uuid = temp_url.toString()
    URL.revokeObjectURL(temp_url) //释放这个url
    return uuid.substring(uuid.lastIndexOf('/') + 1)
};

/**
 *金额格式化
 * @param {number} number：要格式化的数字
 * @param {number} decimals：保留几位小数 默认两位小数
 * @param {string} dec_point：小数点符号 默认,
 * @param {string} thousands_sep：千分位符号 默认.
 */
export const moneyFormat = (number, decimals, dec_point, thousands_sep) => {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    const n = !isFinite(+number) ? 0 : +number
    const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
    const sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep
    const dec = typeof dec_point === 'undefined' ? '.' : dec_point
    let s = ''
    const toFixedFix = function(n, prec) {
        const k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    const re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
};

/**
 * 存储操作
 */
class MyCache {
    constructor(isLocal = true) {
        this.storage = isLocal ? localStorage : sessionStorage
    }

    setItem(key, value) {
        if (typeof (value) === 'object') value = JSON.stringify(value)
        this.storage.setItem(key, value)
    }

    getItem(key) {
        try {
            return JSON.parse(this.storage.getItem(key))
        } catch (err) {
            return this.storage.getItem(key)
        }
    }

    removeItem(key) {
        this.storage.removeItem(key)
    }

    clear() {
        this.storage.clear()
    }

    key(index) {
        return this.storage.key(index)
    }

    length() {
        return this.storage.length
    }
}

const localCache = new MyCache()
const sessionCache = new MyCache(false)

export { localCache, sessionCache };

/**
 * 下载文件
 * @param {string} api ：接口地址
 * @param {object} params：请求参数
 * @param {string} fileName：文件名 默认,
 */
const downloadFile = (api, params, fileName, type = 'get') => {
    axios({
        method: type,
        url: api,
        responseType: 'blob',
        params: params
    }).then((res) => {
        let str = res.headers['content-disposition']
        if (!res || !str) {
            return
        }
        let suffix = ''
        // 截取文件名和文件类型
        if (str.lastIndexOf('.')) {
            fileName ? '' : fileName = decodeURI(str.substring(str.indexOf('=') + 1, str.lastIndexOf('.')))
            suffix = str.substring(str.lastIndexOf('.'), str.length)
        }
        //  如果支持微软的文件下载方式(ie10+浏览器)
        if (window.navigator.msSaveBlob) {
            try {
                const blobObject = new Blob([res.data]);
                window.navigator.msSaveBlob(blobObject, fileName + suffix);
            } catch (e) {
                console.log(e);
            }
        } else {
            //  其他浏览器
            let url = window.URL.createObjectURL(res.data)
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileName + suffix)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(link.href);
        }
    }).catch((err) => {
        console.log(err.message);
    })
};

/**
 * 深拷贝
 */
export const clone = parent => {
    // 判断类型
    const isType = (obj, type) => {
        if (typeof obj !== "object") return false;
        const typeString = Object.prototype.toString.call(obj);
        let flag;
        switch (type) {
            case "Array":
                flag = typeString === "[object Array]";
                break;
            case "Date":
                flag = typeString === "[object Date]";
                break;
            case "RegExp":
                flag = typeString === "[object RegExp]";
                break;
            default:
                flag = false;
        }
        return flag;
    };

    // 处理正则
    const getRegExp = re => {
        let flags = "";
        if (re.global) flags += "g";
        if (re.ignoreCase) flags += "i";
        if (re.multiline) flags += "m";
        return flags;
    };
    // 维护两个储存循环引用的数组
    const parents = [];
    const children = [];

    const _clone = parent => {
        if (parent === null) return null;
        if (typeof parent !== "object") return parent;

        let child, proto;

        if (isType(parent, "Array")) {
            // 对数组做特殊处理
            child = [];
        } else if (isType(parent, "RegExp")) {
            // 对正则对象做特殊处理
            child = new RegExp(parent.source, getRegExp(parent));
            if (parent.lastIndex) child.lastIndex = parent.lastIndex;
        } else if (isType(parent, "Date")) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime());
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
        }

        // 处理循环引用
        const index = parents.indexOf(parent);

        if (index != -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index];
        }
        parents.push(parent);
        children.push(child);

        for (let i in parent) {
            // 递归
            child[i] = _clone(parent[i]);
        }

        return child;
    };
    return _clone(parent);
};
/*此方法存在一定局限性：一些特殊情况没有处理: 例如Buffer对象、Promise、Set、Map。如果确实想要完备的深拷贝，推荐使用 lodash 中的 cloneDeep 方法。*/

/**
 * 下载文件
 * @param {array} list ：原数组
 * @param {string} keyWord：查询的关键词
 * @param {string} attribute：数组需要检索属性
 */
export const fuzzyQuery = (list, keyWord, attribute = 'name') => {
    const reg = new RegExp(keyWord)
    const arr = []
    for (let i = 0; i < list.length; i++) {
        if (reg.test(list[i][attribute])) {
            arr.push(list[i])
        }
    }
    return arr
};

/**
 * 遍历树节点
 * 可以用来根据某个字段来查找节点，在callback中进行判断
 * @param {array} data ：原数组
 * @param {string} callback：查询的关键词
 * @param {string} childrenName：数组需要检索属性
 */
export const foreachTree = (data, callback, childrenName = 'children') => {
    for (let i = 0; i < data.length; i++) {
        callback(data[i])
        if (data[i][childrenName] && data[i][childrenName].length > 0) {
            foreachTree(data[i][childrenName], callback, childrenName)
        }
    }
};
