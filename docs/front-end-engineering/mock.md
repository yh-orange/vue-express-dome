## 为什么要实现数据 mock
***

1. 现在的开发很多都是前后端分离的模式，前后端的工作是不同的，当我们前端界面已经完成，但是后端的接口迟迟不能提供前端很多时候都会等接口。

2. 测试人员想要你提供一份可以直接测试，自行修改后端接口，测试 UI 的时候。

3. 后端的接口，不能提供一些匹配不到的场景的时候。

这个时候如果前端可以实现自己的一套 mock 数据，这里的问题都会迎刃而解，我们可以模拟真实的接口，提供我们自己需要的数据及其数据结构。

这样，我们可以在后端未完成的情况下，完成测试，调试以及优化。

## mock 数据的方案
***

实现前端数据 mock 是在前端构建中不可缺少到一个步骤，不管是在开发或者调试都是必不可少的。

那么我们要实现数据的 mock ，有哪些操作呢？其中最常规到方法就那么几种：

1.本地自己编写静态的json文件

2. 引入 mock.js 实现请求拦截。

3. 搭建一个属于自己到 mock 服务器，模拟自己想要到数据及其数据结构。

4. 搭建RAP 可视化到一个 mock 服务器

5. 使用其他开源的mock工具

6. 其他手段

## 使用mock.js进行模拟
***

**安装**
```text
npm install mockjs --save
npm install axios --save
```

**使用**
```js
Mock.mock('http://123.com',{
    'name|3':'fei',//这个定义数据的模板形式下面会介绍
    'age|20-30':25,
})
$.ajax({
    url:'http://123.com',
    dataType:'json',
    success:function(e){
       console.log(e)
    }
})
```

**如何定义数据**

数据模板中的每个属性由 3 部分构成：`属性名`、`生成规则`、`属性值`：

占位符的定义：
> 占位符是在属性值的位置写入带有 @ 的字符串，并不会出现在最终的数据中，而是一个数据格式
```text
@占位符
@占位符(参数 [, 参数])
```
```js
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}
```

**生成规则**

:::tip 生成规则 有 7 种格式：

1. 'name|min-max': value
2. 'name|count': value
3. 'name|min-max.dmin-dmax': value
4. 'name|min-max.dcount': value
5. 'name|count.dmin-dmax': value
6. 'name|count.dcount': value
7. 'name|+step': value
:::

生成规则和示例：

**属性值是字符串 String**
|输入|描述|
| - | - |
|`name|min-max: string`|	通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。|
|`name|count: string`|	通过重复 string 生成一个字符串，重复次数等于 count。|

**属性值是数字 Number**
|输入|描述|
| - | - |
|`name|+1: number`|	属性值自动加 1，初始值为 number。|
|`name|min-max: number`|	生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。|
|`name|min-max.dmin-dmax: number`|	生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。|

```js
Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}
```

**属性值是布尔型 Boolean**
|输入|描述|
| - | - |
|`name|1: boolean`|	随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。|
|`name|min-max: value`|	随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。|

**属性值是对象 Object**
|输入|描述|
| - | - |
|`name|count: object`|从属性值 object 中随机选取 count 个属性。|
|`name|min-max: object|`	从属性值 object 中随机选取 min 到 max 个属性。|

**属性值是数组 Array**
|输入|描述|
| - | - |
|`name|1: array`|	从属性值 array 中随机选取 1 个元素，作为最终值。|
|`name|+1: array`|	从属性值 array 中顺序选取 1 个元素，作为最终值。|
|`name|min-max: array`|	通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。|
|`name|count: array`|	通过重复属性值 array 生成一个新数组，重复次数为 count。|

**属性值是函数 Function**
|输入|描述|
| - | - |
|`name: function`|执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。|

**属性值是正则表达式 RegExp**
|输入|描述|
| - | - |
|`name: regexp`|根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。|

```js
Mock.mock({
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\w\W\s\S\d\D/,
    'regexp3': /\d{5,10}/
})
// =>
{
    "regexp1": "pJ7",
    "regexp2": "F)\fp1G",
    "regexp3": "561659409"
}
```

## 使用webpack-api-mocker插件mock数据

用法多种，一种如下
* 首先需要在`webpack`开发环境配置文件中引入插件
```js
const apiMocker = require('webpack-api-mocker');
  devServer: {
     before(app) {
        //mock/index.js为mock文件夹入口
        if (process.env.MOCK) {
          apiMocker(app, path.resolve('mock/index.js'));
        }
     },
  }

```

* 启用多个命令

```json
{
    "mock": "node app.mock.js",
    "start": "babel-node app.dev.js",
    "start-mock": "npm run start && npm run mock"
}
```

```js
// app.mock.js
'use strict';

/**
 * app.mock.js
 * Created by yinHu on 2021/12/12.
 */

const path = require('path');
const express = require('express');
const apiMocker = require('webpack-api-mocker');
const app = express();
//跨域问题解决方面
const cors = require('cors');
app.use(cors({
    methods: ['PUT, POST, GET, DELETE, OPTIONS'],
    origin: ['*'],
}));

//跨域问题解决方面
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:80');//的允许所有域名的端口请求（跨域解决）
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Methods', ['PUT, POST, GET, DELETE, OPTIONS']);
    next();
});

app.set('port', '4000');
apiMocker(app, path.resolve('./mock/server-entry.js'));
app.listen(app.get('port'), function () {
    console.log(`${` ------ Mock server started at: ${app.get('port')} ------ `}`);
});
```

### 配置mock的入口文件

```js
// mock/index.js
'use strict';

/**
 * comment.js
 * Created by yinHu on 2021/12/12.
 */

const fs = require('fs');
const path = require('path');

const dir = `${__dirname}/mock-server`;
const route = {};

fs.readdirSync(dir).forEach(function (fileName) {
    Object.assign(route, require(path.join(dir, fileName)));
});

module.exports = route;
```

### 然后创建响应的接口响应处理部分和惊悚数据部分

```js

'use strict';

/**
 * comment.js
 * Created by yinHu on 2021/12/12.
 */

const users = require('../mock-data/user.json');

module.exports = {
    'GET /user': users[0],
    'GET /user/list': users,
    'POST /user/login/account': (req, res) => {
        console.log(req.body);
        const { password, username } = req.body;
        console.log(password, username, '=================');
        if (password === '888888' && username === 'admin') {
            return res.json({
                status: 'ok',
                code: 0,
                token: 'xxx-xxx-xxx',
                data: users[1]
            });
        } else {
            return res.status(403).json({
                status: 'error',
                code: 403
            });
        }
    },
    'DELETE /user/:id': (req, res) => {
        console.log('---->', req.body);
        console.log('---->', req.params.id);
        res.send({
            status: 'ok',
            message: '删除成功！'
        });
    }
};

```

```json
[
    {
        "id": 1,
        "username": "kelos",
        "sex": 6
    },
    {
        "id": 2,
        "username": "hebo",
        "sex": 22
    }
]
```

简单的使用就完成了
