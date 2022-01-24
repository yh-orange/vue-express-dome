# Markdown 纯文本的标记语言

## 一、标题 

类似HTML中的h系列标题其实和HTML中的h系列很像，
想要设置为标题的文字前面加#来表示，根据#的个数，字体大小递减

####注：标准语法一般在#后跟个空格再写文字，
```markdown
# 这是一级标题
## 这是二级标题
### 这是三级标题
#### 这是四级标题
##### 这是五级标题
###### 这是六级标题
```
---

## 二、字体
加粗
要加粗的文字左右分别用两个*号包起来

**这是加粗的文字**

---
斜体
要倾斜的文字左右分别用一个*号或者用_包起来

_这是倾斜的文字_

---
斜体加粗
要倾斜和加粗的文字左右分别用三个*号包起来

***这是斜体加粗的文字***

---
删除线
要加删除线的文字左右分别用两个~~号包起来

~~这是加删除线的文字~~

---

## 三、引用
在引用的文字前加>即可。引用也可以嵌套，如加两个>>三个>>>
n个...
>这是引用的内容
>>这是引用的内容
>>>这是引用的内容
>>>这是引用的内容

---

## 四、分割线
三个或者三个以上的 - 或者 * 都可以

***
----
## 五、图片
[图片alt](图片地址 ''图片title'')
图片alt就是显示在图片下面的文字，相当于对图片内容的解释。
图片title是图片的标题，当鼠标移到图片上时显示的内容。title可加可不加

[未闻花名](https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E6%9C%AA%E9%97%BB%E8%8A%B1%E5%90%8D%E9%AB%98%E6%B8%85%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=1&spn=0&di=55660&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=315588053%2C1310466366&os=614958856%2C280354101&simid=315588053%2C1310466366&adpicid=0&lpn=0&ln=979&fr=&fmq=1642403544422_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%3A%2F%2Fwallpaperm.cmcm.com%2F01083e39c82cd2532a03d3044b9de57f.jpg%26refer%3Dhttp%3A%2F%2Fwallpaperm.cmcm.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1644995554%26t%3Dc9ab6ea5db8301bfbf6e8aa1bbf45b79&fromurl=ippr_z2C%24qAzdH3FAzdH3Fktzit_z%26e3Bt3tgfiwg_z%26e3Bv54AzdH3FdAzdH3Fna8cll_z%26e3Bfip4s&gsm=2&rpstart=0&rpnum=0&islist=&querylist=&nojc=undefined&dyTabStr=MCwzLDYsNCw1LDEsMiw3LDgsOQ%3D%3D, 'hover tip')

---

## 六、超链接

[超链接名](超链接地址 "超链接title")
title可加可不加

[百度](http://baidu.com, '百度')

## 七、列表

无序列表 无序列表用 - + * 任何一种都可以

- 列表内容
+ 列表内容
* 列表内容

注意：- + * 跟内容之间都要有一个空格

---

有序列表 数字加点加空格

1. 列表内容
2. 列表内容
3. 列表内容

注意：序号跟内容之间要有空格

---
列表嵌套

1. 列表内容

   * test
   * test
   * test
   
2. 列表内容
    1. 列表内容
    2. 列表内容
    3. 列表内容
    
* 列表内容
   1. 列表内容
   2. 列表内容
   3. 列表内容
   
## 八、表格
 
 表头|表头|表头
 ---|:--:|---:
 内容|内容|内容
 内容|内容|内容
 
 第二行分割表头和内容。
 - 有一个就行，为了对齐，多加了几个
 文字默认居左
 -两边加：表示文字居中
 -右边加：表示文字居右
 注：原生的语法两边都要用 | 包起来。此处省略


| 表头 | 表头 | 表头 | 哈哈哈 | 2333 |
| --- | --- | --- | --- | --- |
|第一行|第一行|第一行|
|第二行|第二行|第二行|
|第三行|第三行|第三行|

| 表头 | 表头表头表头 | 表头表头表头 |
| :---: | :--- | ---: |
|内容|内容|内容|
|内容|内容|内容|

***

## 九、代码

单行代码：代码之间分别用一个反引号包起来
`const obj = {};`

代码块：代码之间分别用三个反引号包起来，且两边的反引号单独占一行
```vue
<el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
```

## 十、MarkDown 扩展

代码块中行高亮
* 行数区间: 例如 {5-8}, {3-10}, {10-17}
* 多个单行: 例如 {4,7,9}
* 行数区间与多个单行: 例如 {4,7-13,16,23-27,40}

``` js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
### 导入代码片段
beta版本中才可以使用
`<<< @/filepath{highlightLines}`

### Emoji
输入`:tada:` :tada: `:100:`  :100: 


  [更多](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)



### 目录
输入`[[toc]]`

[[toc]]

### 代码块中语法高亮
VuePress 使用了 Prism (opens new window)来为 markdown 中的代码块实现语法高亮，只需要注明语法的类型即可

``` js
export default {
  name: 'MyComponent',
  // ...
}
```

### 自定义容器

::: tip 提示
this is a tip
:::

::: warning 注意
this is a tip
:::

::: danger 警告
this is a tip
:::
