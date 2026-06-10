/* eslint-disable prefer-const */
/* eslint-disable no-undef */

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = ''
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
    if (date) random = random + Date.now()
    return random
}

/**
 *加密处理
 */
export const encryption = (params) => {
    let {
        data,
        type,
        param,
        key
    } = params
    const result = JSON.parse(JSON.stringify(data))
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele])
        })
    } else {
        param.forEach(ele => {
            var data = result[ele]
            key = CryptoJS.enc.Latin1.parse(key)
            var iv = key
            // 加密
            var encrypted = CryptoJS.AES.encrypt(
                data,
                key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.ZeroPadding
                })
            result[ele] = encrypted.toString()
        })
    }
    return result
}

/**
 * 获取对象类型
 */
export const getObjType = obj => {
    var toString = Object.prototype.toString
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
}

/**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getObjType(data)
    var obj
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'array') {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (type === 'object') {
        for (var key in data) {
            obj[key] = deepClone(data[key])
        }
    }
    return obj
}

/**
 * 加密
 * @param {*} code
 */
export const compile =   code => {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length)
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
    }
    return escape(c)
}
/**
 * 解密
 * @param {*} code
 */
export const uncompile =  code => {
    code = unescape(code)
    var c = String.fromCharCode(code.charCodeAt(0) - code.length)
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
    }
    return c
}

/**
 * 数组排序
 */
export const sortByKey = (array, key) => {
    return array.sort(function(a, b){
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

/**
 * 时间戳转日期
 */
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
