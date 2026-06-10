# PHthon

## 基础教学

### 常见关键字

**print**

1. 简单输出

```py
a=100  # 变量a,值为100
b=50  # 变量b,值为50
print(90) # 输出数字90
print(a) #输出变量a的值，100
print(a*b) # 输出a*b的运算结果，运算结果为5000
print('北京欢迎你!!!')
```

2. 不换行输出

```py
a=100  # 变量a,值为100
b=50  # 变量b,值为50
print(a,b,"要么出众,要么出局!!!")
```

3. 输出 ASCII 码所对应的字符

```py
print('b')  # 输出字符b
print(chr(98))  # 输出字符b
print('C') #输出字符C
print(chr(67)) #输出字符C
print(8) # 输出字符8
print(chr(56)) # 输出字符8
print('[')  #输出[
print(chr(91)) #输出[
```

4. 使用 print 输出中文 Unicode 编码

```py
print(ord('北'))  #  北  这个字的编码（数字）21271
print(ord('京'))
print('\u5317\u4eac')
```

5. 使用 print 函数将内容输出到文件

```py
fp=open('note.txt','w') # 打开文件  w-->write
print('北京欢迎你',file=fp) # 输出到文件中
fp.close() #关闭文件
```

6. 多条 print 输出到一行显示

```py
print('北京',end='--->')
print('欢迎我23333')
print('欢迎你')
print('欢迎我')
```

7. 使用连接符连接多个字符串

```py
print(1314) #直接输出整数
print(3.14)  #直接输出浮点数（带小数点的数）
print(1,3,1,4) # 使用逗号连接要输出的数字，中间使用空格连接
print(192,168,1,1,sep='.')#使用间隔符.进行连接，数值之间用.进行分隔
#print('北京欢迎你'+2022) #TypeError: can only concatenate str (not "int") to str
print('北京欢迎你'+'2022')
```

**input**

1. 基本使用

```py
name=input('请输入您的姓名:')
print('我的姓名是:'+name)
```

2. 输入整数类型的数据

```py
num=int(input('请输入您好的幸运数字:')) # 将输入的字符串的类型转换成int（整数）类型
print('您的幸运数字为:',num)
```

**注释**
`单行注释`:
直接使用`#`

`多行注释`:

```py
'''
版权所有:马士兵教育
文件名 :11.多行注释
创建人:杨淑娟
'''

"""
版权所有:马士兵教育
文件名 :11.多行注释
创建人:杨淑娟
"""
""""""
```

`中文声明注释`:

```txt
#coding:utf-8
```

**类的定义**

```py
class Student:
    name = 'yh'
    age = 18
    pass


print(Student)
print(Student.name)
print(Student.age)
```

**函数定义**

```py
def fun(data):
    # print(data)
    data.name = 'gao'
    data.age = 20
    print(data.age, data.name)
    pass


fun(Student)


def fun2(data):
    print(data, data[0], data[1] + 1)
    data[0] = 'wdl'
    data[1] = 24
    print(data[0], data[1], sep='***---****')
    pass


Student2: list[str, int] = ['cj', 18]

print(Student2)
fun2(Student2)
```

**保留字**

```py
# coding:utf-8
import keyword

print(keyword.kwlist)
print(keyword.kwlist[0])
print(type(keyword.kwlist))
print(2 not in [1, 2, 3])
```

`['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']`

**标识符的命名规则**

```py
# coding:utf-8
my_name_1='杨淑娟'  # my_name_1 就是一个标识符

#1_my_name='杨淑娟'  #1_my_name 不符合规则 ，因为是以数字开头

My_name_1='Python娟子姐'
print(my_name_1)
print(My_name_1)

#True='真'  不能使用保留字作标识符
_姓名='杨淑娟'  #可以使用中文命名标识符，但是不建议使用
print(_姓名)
```

**变量的定义和使用**

```py
# coding:utf-8
#创建一个整型变量luck_number,并为其赋值为8
luck_number=8

my_name='杨淑娟'  #字符串类型的变量
print(my_name,'的幸运数字为:',luck_number)
print('luck_number的数据类型是:',type(luck_number))

#Python动态修改变量的数据类型，通过赋不同类型的值就可以直接修改
#变量的值可以更改
luck_number='北京欢迎你'
print('luck_number的数据类型是:',type(luck_number))

#Python允许多个变量指向同一个值
no=number=1024
print(no,number)
print(id(no))
print(id(number))

name1='yh'
name2='yh'
print(id(name1), id(name2), sep='----')
```

**整数类型**

```py
# coding:utf-8
num = 987  # 默认十进制，表示整数
num2 = 0b1010101  # 使用二进制表示整数
num3 = 0o765  # 使用八进制表示整数
num4 = 0x87ABF  # 使用十六进制表示整数
print(num)
print(num2)
print(num3)
print(num4)
```

**浮点数类型**

```py
# coding:utf-8
height = 187.6  # 身高
print(height)
print(type(height))  # 查询height的数据类型

x = 10
y = 10.0
print('x的数据类型是:', type(x))
print('y的数据类型是:', type(y))
if (type(x) == '''<class 'int'>'''):
    print('true')
else:
    print('false')
print('------------------------')
# 浮点数不确定的尾数问题
print(0.1 + 0.2)  # 0.30000000000000004

print(round(0.1 + 0.00000000002, 5))  # 保留1位小数
print(abs(-10), abs(10), abs(-10) == abs(10))
```

**复数类型**

```py
# coding:utf-8

# 复数类型在科学计算中十分常见
x=123+456j
print('实数部分:',x.real)
print('虚数部分:',x.imag)
```

**字符串类型**

```py
# coding:utf-8
# 单行字符串
city='北京'
address="北京市海淀区海淀文教产业园"
print(city)
print(address)

print('------------------')
#多行字符串
info='''地址：北京市海淀区海淀文教产业园
收件人:杨淑娟
手机号:18600000000'''
print(info)

info2="""地址：北京市海淀区海淀文教产业园
收件人:杨淑娟
手机号:18600000000"""
print('------------------')
print(info2, type(info2))
```

**转义字符**

```py
# coding:utf-8
print('北京')
print('欢迎你')

print('------------------')
print('北京\n欢迎你') # 遇到\n即换行，可连接续换多行
print('北\n京\n欢\n迎\n你')
print('------------')
print('北京北京\t欢迎你')
print('hellooooo')
print('--------------------')
print('老师说:\'好好学习，天天向上\'')
print('老师说:\"好好学习，天天向上\"')

print(r'北\n京\n欢\n迎\n你')
print(R'北\n京\n欢\n迎\n你')
```

**字符串的索引和切片**

```py
# coding:utf-8
s = 'HELLOWORLD'
print(s)
print(s[0], s[-10])  # 序号0和序号码0表示的是同一个字符

print('北京欢迎你'[0])
print('北京欢迎你'[1])
print('北京欢迎你'[4])
# print('北京欢迎你'[5])
print('北京欢迎你'[-5])
print('北京欢迎你'[-1])

print('---------------------')
print(s[1:2])  # 正向递增序列
print(s[2:1])  # 正向递增序列
print('---------------------')
print(s[-9:-10])  # 正向递增序列
print(s[-10:-9])  # 正向递增序列
print(s[-10:1])  # 正向递增序列
print('---------------------正向递增序列')
print(s[0:1], '===')  # 反向递减序列
print(s[1:2], '===')  # 反向递减序列
print(s[-8:-3], '===')  # 反向递减序列
print(s[-3:-8], '-----')  # 反向递减序列
print('---------------------反向递减序列')
# N默认从0开始
print(s[:5])
#
# M 默认，是切到字符串的结尾
print(s[5:])
print(s[-10], 66666)

# 直接用索引 正向是从0开始 反向是从-1开始  不能大于数组长度
# 用[] 获取数据,如果是单个参数和直接使用索引规则一直，
# 用[] 如果是使用分号则代表从第一个参数到第二个参数，如果省略第一个参数代表从0开始如果省略第二个参数代表截取到最后一位
# 如果 第二个参数小于第一个参数，那代表截图到的为空 返回为空
```

**字符串类型的操作**

```py
# coding:utf-8
x='2022年'
y='北京冬奥会'
print(x+y)  #拼接字符串x与y
print(10*x) #x字符串的内容输出10次
print(x*10)

print('北京' in y) #‘北京’是否是 “北京冬奥会”的子字符串
print('上海' in y)
```

**布尔类型**

```py
# coding:utf-8
x = True
print(x)
print(x + 2333)
print(type(x))
print(True + 10)  # 1+10
print(False + 10)  # 0+10

print('-----------------------------')
# 测试对象的bool值
print(bool(18) + 11)  # True
print(bool('18'))  # True
print(bool(0), bool(0.0), bool(0.1))  # False
# 总结， 非0的数值型布尔值都为True，
print(bool('北京欢迎你'))  # True
print(bool(''))  # 空字符串的布尔值为False
print(bool(False))
print(bool(None))
print(bool(10) + 10)
print(bool(1) == True)
print(bool(0) == True)
```

**数据类型之间的转换**

```py
# coding:utf-8
x=10
y=3
z=x/y # 在执行除法运算，将运算的结果赋值给z
print(z,type(z)) # 隐式转换， 通过运算隐式的转了结果的数据类型

# float类型转换成int类型，只保留整数部分
print('float类型转换成int类型',int(3.14))
print('float类型转换成int类型',int(3.9))
print('float类型转换成int类型',int(-3.14))
print('float类型转换成int类型',int(-3.9))

# 将int类型转换成float类型
print('将int类型转换成float类型',float(10.1234650000))

#将str类型转成int类型
print(int('100')+int('200'))

#将str类型转成float类型
print('将str类型转成float类型',float('3.14'))

#将str转成int或float类型报错的情况
#print(int('18a')) #ValueError: invalid literal for int() with base 10: '18a'
#print(int('3.14')) #ValueError: invalid literal for int() with base 10: '3.14'
print(int('3')) #ValueError: invalid literal for int() with base 10: '3.14'
print(float('3.14')) #ValueError: invalid literal for int() with base 10: '3.14'

#将str转成float类型报错的情况
#print(float('45a.987')) #ValueError: could not convert string to float: '45a.987'

#chr()与ord()函数
print(ord('杨')) #26472 ，将字符“杨”转成对应的整数 值
print(chr(26472)) #杨  将整数 值转成对应的字符

# 进制之间的转换操作 十进制与其它进制之间的转换
print('十进制转成十六进制:'+hex(26472))
print(0x6768)
print('十进制转成八进制:'+oct(26472))
print(0o63550)
print('十进制转成二进制:'+bin(26472))
print(0b110011101101000)
```

**eval 函数的使用**

```py
# coding:utf-8
s='3.14+3'
print(s,type(s))
x=eval(s)   # 执行了加法运算
print(x,type(x))

#eval()函数经常和input()函数一起使用，用来获取用户输入的数值型
age=eval(input('请输入您好的年龄:'))  #将字符串类型转成了int类型，相当于int(age)
print(age,type(age))

height=eval(input('请输入您的身高:')) #将字符串类型转成了float类型，相当于 float(height)
print(height,type(height))
#hello='北京欢迎你'
#print(hello)
#使用eval报错的情况
# print(eval('hello')) #NameError: name 'hello' is not defined. Did you mean: 'help'?
```

**算术运算符**

```py
# coding:utf-8
print('加法:',1+1)
print('减法:',1-1)
print('乘法:',2*3)
print('除法:',10/2)  #　发生了隐式转换
print('取余:',10%3)
print('整除:',10//3)
print('幂运算:',2**3) # 2*2*2

#print(10/0) #ZeroDivisionError: division by zero
```

**赋值运算符**

```py
# coding:utf-8
x = 20  # 直接赋值，直接将20赋值给左侧的变量x
y = 10
x = x + y  # 将x+y的和赋值给x,x的值为30
print(x)
x += y
print(x)  # 40
x -= y  # 相当于x=x-y
print(x)  # 30
x *= y  # x=x*y
print(x)  # 300
x /= y  # x=x/y
print(x)  # 30.0
x %= 2  # x=x%2
print(x)  # 0.0
z = 3
y //= z  # y=y//z
print(y)  # 3

y **= 4  # y=y**2
print(y)

# Python支持链式赋值
a = b = c = 100  # 相当于 执行了a=100   b=100  c=100
print(a, b, c)
print(id(a), id(b), id(c), id(100))
print(a == b, b == c, c == a)

# Python支持系列解包赋值
a, b = 10, 20  # 相当于执行了  a=10   b=20
print(a, b)

print('-----------如何交换两个变量的值----------------')
temp = 0
temp = a  # 将a的值班赋值给temp, temp的值为10
a = b  # 将b的值赋值给a ,a的值为20
b = temp  # 将temp的值赋值给b, b的值是10
print(a, b)
b, a = a, b  # 将a的值赋给了b,将b的值赋给了a
print(a, b)
```

**比较运算符**

```py
# coding:utf-8
print('98大于90吗？',98>90)
print('98小于90吗?',98<90)
print('98等于90吗?',98==90,'98等于98吗?',98==98)
print('98不等于90吗?',98!=90,'98不等于98吗？',98!=98)
print('98大于等于98吗？',98>=98)
print('98小于等于98吗',98<=98)
```

**18.逻辑运算符**

```py
# coding:utf-8
# 且
print(True and True)
print(True and False)
print(False and False)
print(False and True)
print('--------------------------------------')
print(8>7 and 6>5) # True and True
print(8>7 and 6<5) # True and False
print(8<7 and 10/0) # 当第一个表达式为False时，不计算第二个表达式

print('--------------------------------------')
# 或
print(True or True)
print(True or False)
print(False or False)
print(False or True)
print('--------------------------------------')
print(8>7 or 10/0) #当第一个表达式为True时，不计算第二个表达式

print('--------------------------------------')
# 取反
print(not True )
print(not False)
print(not (8>7))
print(not 0)
```

**位运算**

```py
# coding:utf-8
print(12&8) #位与运算
print(4|8) #位或运算
print(1|2) #位或运算
print(31^22) #位异或运算
print(~123) #位取反运算
#左移位
print('左移位:',2<<2) #将2 向左移动2位 010 01000 1 * 2
print('左移位:',8<<2) #将2 向左移动2位 01000 0100000
# 进制之间的转换操作 十进制与其它进制之间的转换
print('十进制转成十六进制:'+hex(26472))
print(0x6768)
print('十进制转成八进制:'+oct(26472))
print(0o63550)
print('十进制转成二进制:'+bin(-8))
print(0b1000)
print(0b100)
print(0b10)
print(0b1)
print('左移位:',8<<3) #将2 向左移动2位
print('左移位:',8<<4) #将2 向左移动2位
print('左移位:',8<<1) #将2 向左移动2位
print('左移位:',2<<3) #将2,向左移动3位
#
print('右移位:', 8>>2) #将8向右移动2位
print('右移位:', -8>>2)
print(-0b10)
print('右移位:', -8>>3)
print(-0b1)
print('右移位:', -8>>4)
print(-0b1)
print('右移位:', -8>>5)
print(-0b1)
```

**顺序结构**

```py
# coding:utf-8
# 赋值运算符的执行顺序，从右到左
name = '张三'  # 将“张三”赋值给变量name
age = 20  # 将20赋值给变量age

a = b = c = d = 100  # 将a,b,c,d的值同时赋值为100 ，链式赋值
print(id(a), id(b), id(c), id(d), id(100))
# 系列解包赋值
name1, age1 = '李四', 20  # 元组分解赋值
print(name, age)
print(name1, age1)
print(age == age1, id(age) == id(age1))
[name2, age2] = ['王五', 30]  # 列表分解赋值
print(name2, age2)

a, b, c, d = 'room'  # 字符串分解赋值
print(a)
print(b)
print(c)
print(d)
print('room')
# 扩展的字符串解包赋值
a, *b = ['room', 2, 3]
print(a)
print(b)
print('----------输入输出语句，也是典型的顺序结构------------')
name = input('请输入您的姓名:')
age = eval(input('请输入您的年龄:'))
lucky_number = eval(input('请输入您的幸运数字:'))
print('姓名:', name)
print('年龄:', age)
print('幸运数字:', lucky_number)
```

**选择结构**

```py
# coding:utf-8
number = eval(input('请输入您的6位中奖号码:'))
print(number)
print(type(number))
print(id(number))
# 使用if语句
if number == 987654:
    print('恭喜您，中奖了')

if number != 987654:
    print('您未中本期大奖')
print('-----------以上if判断的表达式，使用比较运算符，比较表达式，------------------')

n = 98  # 赋值
if n % 2:  # 98%2 的余数为0,0的布尔值为False， 非0的布尔值为True
    print(n, '为奇数')

if not n % 2:  # 98%2的余数为0  0的布尔值为False， not False  结果为True
    print(n, '为偶数')

print('-------判断一个字符串是否是空字符串-----------')
x = input('请输入一个字符串:')  # 空字符串的布尔值为False，非空字符串的布尔值为True

if x:
    print('x是一个非空字符串')

if not x:
    print('x是一个空字符串')
print('----------表达式也可以是一个单纯的变量-----------------------')
flag = eval(input('请输入一个布尔类型的值:True 或False'))
if flag:  # flag是一个布尔值类型的变量，值为True或False
    print('flag的值为True', flag, type(flag))

if not flag:
    print('flag的值为False')

print('----------使用if语句时，如果语句块只有一句代码，可以将语句块直接写在冒号的后面----------------')
a = 10
b = 5
if a > b: max = a
print('a和b的最大值为：', max)

age = eval(input('請輸入年紀'))
if age > 18:
    print('我成年了哦')
else:
    print('我還沒成年哦')
```

**语句常见问题**

```py
# coding:utf-8
number = eval(input('请输入一个整数'))
if number % 2:  # 冒号是if语句语法的重要组成部分
    print('这是一个奇数')
    print('程序结束')
else:print('这是一个偶数')
```

**if-else 语句**

```py
# coding:utf-8
number = eval(input('请输入您的6位中奖号码:'))
# if...else
if number == 987654:
    print('恭喜您中奖了')
else:
    print('您未中本期大奖')

print('以上代码还可以使用条件表达式简化---')
# number==987654为True是，将 "恭喜发您中奖了"赋值给变量result，否则将'您未中本期大奖'赋值给变量result
result = '恭喜发您中奖了' if number == 987654 else '您未中本期大奖'
print(result)
print('恭喜发您中奖了' if number == 987654 else '您未中本期大奖')

isShow = eval(input('请输入是否显示隐藏 值为True 或者False'))

print('显示'if isShow else '隐藏')
```

**多重 if**

```py
# coding:utf-8
score=eval(input('请输入您的成绩:'))
#判断
if score<0 or score>100:
    print('成绩有误')
elif 0<=score<60:
    print('E')
elif 60<=score<70:
    print('D')
elif 70<=score<80:
    print('C')
elif 80<=score<90:
    print('B')
else:
    print('A')
```

**嵌套 if**

```py
# coding:utf-8
answer=input('请问，您喝酒了吗？y/n')
if answer=='y': #代表喝酒了
    proof=eval(input('请输入洒精含量:'))
    if proof<20:
        print('构不成酒驾，祝您一路平安')
    elif proof<80:
        print('已构成酒驾标准，请不要开车')
    else:
        print('已达到醉驾标准，请千万不要开车')
else:  # 代表没有喝酒的情况
    print('你走吧，没你啥事儿')
```

---

**使用 and 连接选择条件**

```py
# coding:utf-8
user_name=input('请输入您的用户名:')
pwd=input('请输入您的密码:')
if user_name=='ysj' and pwd=='888888':
    print('登录成功')
else:
    print('用户名或密码不正确')
```

**使用 or 连接多人选择条件**

```py
# coding:utf-8
score=eval(input('请输入您的成绩:'))
if score<0 or score>100:
    print('成绩无效')
else:
    print('您的成绩为:',score)


data = eval(input('请输入想输入的数据'))
data2 = input('请输入想输入的数据')
print(type(data), '====', type(data2), data2 == '20')
```

**遍历循环 for**

```py
# coding:utf-8
# 遍历字符串
# for i in 'hello':
#     print(i, end='--->')
#     pass
# data = range(1, 11)
# print(data[9])
# # range()函数 ，产生一个[n,m)的整数序列,包含n,不包含m
# for i in range(1, 11):
#     # print(i)
#     if i % 2 == 0:
#         print(i, '是偶数')
#     else:
#         print(i, '是奇数')
#
# # 计算1-10之间的累加和
# s = 0  # 用于存储累加和
# for i in range(1, 101):
#     s += i  # 相当于s=s+i
# print('1-10之间的累加和为:', s)

print('--------------100-999之间的水仙花数----------------------')
'''
153
3*3*3+5*5*5+1*1*1=153
'''
for i in range(100, 1000):
    sd = i % 10  # 获取个位上的数字
    tens = i // 10 % 10  # 十位上的数字
    hundred = i // 100  # 百位上的数字
    if sd ** 3 + tens ** 3 + hundred ** 3 == i:
        print(i)

print(100 // 20)
print(100 / 20)
```

**遍历循环的扩展形式**

```py
# coding:utf-8
# 计算1-10之间的累加和
s = 0  # 用于存储累加和
for i in range(1, 11):
    s += i  # 相当于s=s+i
else:
    print('1-10之间的累加和为:', s)
```

**无限循环 while**

```py
# coding:utf-8
#1.初始化变量
answer=input('今天要上课吗?y/n')
while answer=='y':  # 2.条件判断
    print('好好学习，天天向上') #3.语句块
    #4.改变变量
    answer=input('今天要上课吗?y/n')

# 1-100之间的累加和
s=0 #存储累加和
i=1  #(1)初始化变量
while i<=100: #(2)条件判断
    s+=i  # 相当于s=s+i  # (3)语句块
    #(4)改变变量
    i+=1
print('1-100之间的累加和:',s)
```

```py
# coding:utf-8
i=0 #统计循环执行的次数
while i<3: # 0,1,2 ,当i=3时 3<3False，循环执行结束
    user_name=input('请输入您的用户名:')
    pwd=input('请输入您的密码:')
    #判断
    if user_name=='ysj' and pwd=='888888':
        print('系统正在登录，请稍后')
        #改变循环条件，退出循环
        i=8  #判断8<3 False,循环执行结束
    else:
        if i<2:
            print('用户名或密码不正确，您还有',2-i,'次机会')
        i+=1  # 改变循环变量

if i==3: #当用户或密码输入不正确的时候，循环执行结束时，i的最大值为3
    print('对不起，三次均输入错')
```

```py
# coding:utf-8
# 三行四列
for i in range(1, 4):
    for j in range(1, 5):
        print('*', end='')
    # 换行
    print()
print('-------------------------------')
for i in range(1, 6):
    for j in range(1, i + 1):  # *的个数与行数相同range(1,2)，range(1,3)，range(1,4)
        # print('*', end='/')
        print('*')
    print()  # 换行
```

```py
# coding:utf-8
# 倒直三角形
# 1-->5 (次)(1,6)  2-->4次(1,5)   3-->3次(1,4)   4  -->2次(1,3)   5-->1次  (1,2)
for i in range(1, 6):
    for j in range(1, 7 - i):
        print('*', end='')
    print()  # 换行

# 等腰三角形
'''
&&&&*
&&&***
&&*****
&*******
*********
'''
print('--------------------------')
for i in range(1, 6):
    # 倒三角形
    for j in range(1, 6 - i):
        print(' ', end='')
    # 1，3，5，7的三角形  range(1,2) , range(1,4)   range(1,6)  ,range(1,8)  range(1,10)
    for k in range(1, i * 2):  # (1,1)  (2,3) (3,5),(4,7) (5,9)
        print('*', end='')
    print()
```

```py
# coding:utf-8
row = eval(input('请输入菱形的行数'))
while row % 2 == 0:
    print('重新输入菱形的行数')
    row = eval(input('请输入菱形的行数'))
top_row = (row + 1) // 2  # 上增部分的行数
# 上半部分
for i in range(1, top_row + 1):
    # 倒三角形
    for j in range(1, top_row + 1 - i):
        print(' ', end='')
    # 1，3，5，7的三角形  range(1,2) , range(1,4)   range(1,6)  ,range(1,8)  range(1,10)
    for k in range(1, i * 2):  # (1,1)  (2,3) (3,5),(4,7) (5,9)
        print('*', end='')
    print()

# 下半部分
bottom_row = row // 2
for i in range(1, bottom_row + 1):
    # 直角三角形
    for j in range(1, i + 1):
        print(' ', end='')
        # 2*bottom_row        2*(bottom_row-1)           2*(bottom_row-2)        2* (bottom_row-1)
    # 倒三角形    range(1,8)  ,range(1,6)  range(1,4)  range(1,2)
    for k in range(1, 2 * bottom_row - 2 * i + 2):  # (1,7) (2,5) (3,3) (4 ,1)
        print('*', end='')
    print()

print('-----------------------------')
```

```py
# coding:utf-8
row=eval(input('请输入菱形的行数'))
while row%2==0:
    print('重新输入菱形的行数')
    row = eval(input('请输入菱形的行数'))

top_row=(row+1)//2  #上增部分的行数
# 上半部分
for i in range(1,top_row+1):
    # 倒三角形
    for j in range(1, top_row+1- i):
        print(' ', end='')
    # 1，3，5，7的三角形  range(1,2) , range(1,4)   range(1,6)  ,range(1,8)  range(1,10)
    for k in range(1,i*2): #(1,1)  (2,3) (3,5),(4,7) (5,9)
        if k==1 or k==i*2-1:
            print('*',end='')
        else:
            print(' ',end='')
    print()

# 下半部分
bottom_row=row//2
for i in range(1,bottom_row+1):
    # 直角三角形
    for j in range(1,i+1):
        print(' ',end='')
                # 2*bottom_row        2*(bottom_row-1)           2*(bottom_row-2)        2* (bottom_row-1)
    # 倒三角形    range(1,8)  ,range(1,6)  range(1,4)  range(1,2)
    for k in range(1,2*bottom_row-2*i+2): # (1,7) (2,5) (3,3) (4 ,1)
        if k==1 or k==2*bottom_row-2*i+2-1:
            print('*',end='')
        else:
            print(' ',end='')
    print()

print('-----------------------------')
```

**跳转语句 break**

```py
# # coding:utf-8
# #1+2+3+4+5+6
s=0  # 存储累加和
i=1
while i<11:
    s+=i # 计算累加
    if s>20:
        print('累加和大于20的当前数',i)
        break

    i+=1
print('-------------------------------')
i=0
while i<3:
    user_name=input('请输入用户名:')
    pwd=input('请输入密码:')
    if user_name=='ysj' and pwd=='888888':
        print('系统正在登录，请稍后...')
        break #直接退出循环
    else:
        if i<2:
            print('用户名或密码不正角，您好还有',2-i,'次机会')
    i+=1 # 改变循环变量
else:
    print('三次均输入错误')

for i in range(1, 10):
    print(i)
    if (i > 5): break

num = eval(input('请输入数字')) or 0
num = input('请输入数字')
print(num, type(num))  # eval('')
print(eval('1+2'))
num = 0
while num < 10:
    if num == 5:
        break
    num = eval(input('请输入数字') or '0')
    print(num, type(num))
```

```py
# coding:utf-8
for i in 'hello':
    if i=='e':
        break
    print(i)
print('---------------------------')
for i in range(3):
    user_name = input('请输入用户名:')
    pwd = input('请输入密码:')
    if user_name == 'ysj' and pwd == '888888':
        print('系统正在登录，请稍后...')
        break  # 直接退出循环
    else:
        if i < 2:
            print('用户名或密码不正角，您好还有', 2 - i, '次机会')
else:
    print('三次均输入错误')
```

**跳转语句 continue**

```py
# coding:utf-8
s = 0
i = 1
while i <= 100:
    if i % 2 == 1:
        i += 1
        continue
    # 累加求和的代码
    s += i
    i += 1
print('1-100之间的偶数和:', s)
```

**索引**

```py
# coding:utf-8
s = 'hello world'
for i in range(0, len(s)):
    print(i, s[i])
print('-----------------')
# 反向递减
for i in range(-len(s), 0):
    print(i, s[i])

print(len('233333'))
print(len(['233333']))


class yhData:
    name = 'yinhu'
    age = 18
    pass


print(yhData,yhData.name, type(yhData.name))
```

**切片操作**

```py
# coding:utf-8
s = 'HelloWorld'
s1 = s[0:5:1]  # 索引从0开始,到5结束，步长为1
print(s1)
# 省略开始位置start,默认从0开始
print(s[:5:1])
# 省略开始位置start，省略步长step
print(s[:5])
# 省略结束位置
print(s[0::1])
# 省略结束位置和步长
print(s[5:])
# 更换一下步长
print(s[0:5:2])  # 从0开始，到5结束（不包含5）步长为2
# 省略开始位置和结束位置，只写步长
print(s[::2])  # 0,2,4,6,8位置上的元素
# 步长可以为负数
print(s[::-1])
print(s[::1])
```

**序列的相关操作**

```py
# coding:utf-8
s = 'Hello'
s2 = 'World'
print(s, s2, end=' ')  # 产生一个新的字符串序列

# 注意事项目 +左右的数据类型相同，，序列中元素的数据类型可以不同
lst = [10, 20, 30, 'PHP']  # 列表属于序列
print(type(lst))
# print(s+lst) #TypeError: can only concatenate str (not "list") to str

# 序列的相乘操作
print(s * 5)
print('------------------------------------')
print('-' * 40)
```

```py
# coding:utf-8
s = 'helloworld'
print('e在helloworld中存在吗?', ('e' in s))
print('v在helloworld中存在吗?', ('v' in s))

print('e不在helloworld中存在吗?', ('e' not in s))
print('v不在helloworld中存在吗?', ('v' not in s))

# 内置的函数
data = [1, 2, 3, 4, 5, 6]
print('len():', len(s))
print('w s da shabi - len():', len('w s da shabi'))
print('max():', max(s))
print('max():', max('我是中国人'))
print('min():', min(s))
print('len():', len(data))
print('max():', max(data))
print('min():', min(data))

# 序列对象的方法，  使用序列的名称，打点调用
print('s.index()', s.index('o'), s[s.index('o')])  # o第一次出现的位置是索引为4的位置
print('s.count()', s.count('o'))  # 统计o在字符串序列s中出现的次数
strLength = s.count('o')
print(strLength, 'strLength', int(strLength) > 0)
indexList = []
if (int(strLength) > 0):
    for index, item in enumerate(s):
        if (item == 'o'):
            indexList += [index]

print(indexList)
```

**序列的相关操作符和函数**

```py
# coding:utf-8
s = 'helloworld'
# print('e在helloworld中存在吗?', ('e' in s))
# print('v在helloworld中存在吗?', ('v' in s))

# print('e不在helloworld中存在吗?', ('e' not in s))
# print('v不在helloworld中存在吗?', ('v' not in s))

# 内置的函数
# data = [1, 2, 3, 4, 5, 6]
# print('len():', len(s))
# print('w s da shabi - len():', len('w s da shabi'))
# print('max():', max(s))
# print('max():', max('我是中国人'))
# print('min():', min(s))
# print('len():', len(data))
# print('max():', max(data))
# print('min():', min(data))

# 序列对象的方法，  使用序列的名称，打点调用
print('s.index()', s.index('o'), s[s.index('o')])  # o第一次出现的位置是索引为4的位置
print('s.count()', s.count('o'))  # 统计o在字符串序列s中出现的次数
strLength = s.count('o')
print(strLength, 'strLength', int(strLength) > 0, int(strLength))
indexList = []
if (int(strLength) > 0):
    for index, item in enumerate(s):
        print(index,item, s[index], s, sep='--')
        if (item == 'o'):
            indexList += [index]

print(indexList)
```

```py
# coding:utf-8
s = 'Hello'
s2 = 'World'
print(s, s2, end=' ')  # 产生一个新的字符串序列

# 注意事项目 +左右的数据类型相同，，序列中元素的数据类型可以不同
lst = [10, 20, 30, 'PHP']  # 列表属于序列
print(type(lst))
# print(s+lst) #TypeError: can only concatenate str (not "list") to str

# 序列的相乘操作
print(s * 5)
print('------------------------------------')
print('-' * 40)
```

```py
# coding:utf-8
# 直接使用[]创建
lst = ['hello', 'world', 99.8, 100]
print(lst)

# 可以使用内置的list()函数创建列表
lst2 = list('helloworld')
lst3 = list(range(1, 10, 3))  # 从1开始，到10结束（不包含10），步长为2
print(lst2)
print(lst3)

# 列表中序列中的一种，对序列操作的运算符，操作符，函数均可以使用
print(lst + lst2 + lst3)  # 序列中的相加操作
print(lst * 3)  # 相乘的操作
print(lst.count('o'), '--------------')  # 统计o的个数
print('lst'.count('s'), '--------------')  # 统计o的个数
print(len(lst))
print(max(lst3))
print(min(lst3))
print(lst2.count('o'))  # 统计o的个数
print(lst2.index('o'))  # o在列表lst2中第一次出现的位置

# 列表的删除操作

lst4 = [10, 20, 30]
print(lst4)
# 删除列表
# del lst4
# print(lst4)  # NameError: name 'lst4' is not defined
```

```py
# coding:utf-8
lst=['hello','world','python','php']
# 使用遍历循环for遍历列表元素
for item  in lst:
    print(item)

# 使用for循环,range()函数,len()函数，根据索引进行遍历
for i in range(len(lst)):
    print(i,'-->',lst[i])

#使用for循环与enumerate()函数，进行遍历
for index,item in enumerate(lst):  #默认序号从0开始
    print(index,item)


for index,item in enumerate(lst,1):  #序号从1开始
    print(index,item)
```

```py
# coding:utf-8
lst=['hello','world','python']
print('原列表:',lst,id(lst))

#新增元素的操作
lst.append('sql')
print('增加元素之后',lst,id(lst))

#使用insert(index,x)在指定的位置上插入元素
lst.insert(1,100)
print('指定插入元素之后',lst,id(lst))

#列表元素的删除操作
item=eval(input('输入你要删除的数据'))
if item in lst:
    lst.remove('world')
    print('删除成功')
else:
    print('输入错误删除失败')

print('删除元素之后的列表',lst,id(lst))

#使用pop(index)根据索引移出元素，先将元素取出，再将元素删除
print(lst.pop(1))
print(lst)

#清除列表中所有的元素clear()
#lst.clear()
#print(lst,id(lst))

#列表反向
lst.reverse()
print(lst)

#列表的拷贝，将产生一个新的列表对象
new_lst=lst.copy()
print(lst,id(lst))
print(new_lst,id(new_lst))

#列表元素的修改
#根据索引进行修改元素
lst[1]='mysql'
print(lst)
```

`sort`基本使用

```py
# coding:utf-8
lst=[4,56,3,78,40,56,89]
print('原列表:',lst)
#排序，默认是升序
lst.sort()   # lst.sort(reverse=False)
print('升序:',lst)

#排序，降序
lst.sort(reverse=True)
print('降序:',lst)

print('------------------------')
lst2=['banana','apple','Cat','Orange']
print('原列表:',lst2)
#升序排序 ,先排大写，再排小写
lst2.sort()
print('升序:',lst2)

#降序  先排小写，后排大写
lst2.sort(reverse=True)
print('降序:',lst2)

#忽略大小写进行比较
lst2.sort(key=str.lower)
print(lst2)
```

`sorted`

```py
# coding:utf-8
lst=[4,56,3,78,40,56,89]
print('原列表:',lst)
#排序
asc_lst=sorted(lst)
print('升序:',asc_lst)
print('原列表:',lst)

#降序
desc_lst=sorted(lst,reverse=True)
print('降序:',desc_lst)
print('原列表:',lst)

lst2=['banana','apple','Cat','Orange']
print('原列表:',lst2)

#忽略大小写的排序
new_lst2=sorted(lst2,key=str.lower)
print('原列表:',lst2)
print('排序后的列表:',new_lst2)
```

```py
# coding:utf-8
#
import random

lst = [item for item in range(1, 11)]
print(lst)

lst = [item * item for item in range(1, 11)]
print(lst)

lst = [random.randint(0, 100) for _ in range(10)]
print(lst)

# 从表表中选择符合条件的元素组成新的列表
lst = [i for i in range(10) if i % 2 == 0]
print(lst)

print(random.randint(0, 100))
for _ in range(10):
    print(_)
```

```py
# coding:utf-8
# 创建二维列表
lst=[
    ['城市','环比','同比'],
    ['北京',102,103],
    ['上海',104,504],
    ['深圳',100,39]
]
print(lst)
#
for index,row in enumerate(lst): #行
    for item in row:#列
        if(index == 0):
            print(item,end='\t | \t')
        else:
            print(item,end='-> \t')
    print()#换行

# 列表生成一个四行五列
lst2=[[j * j for j in range(1, i + 2)] for i in range(1, 5)]
print(lst2)

for item in range(1, 10):
    for i in range(1, item + 1):
        print(i, '*' , item,  '=', item * i, end='\t')

    print()
```

**元组的创建与删除**

```py
# coding:utf-8
# 直接使用()创建元组
t = ('hello', [10, 20, 30], 'python', 'world')
print(t)

# 使用内置tuple()创建元组
t = tuple('helloworld')
print(t)

# t = tuple([10, 20, 30, 40])
# print(t, id(t), id([10, 20, 30, 40]))
# print(t[0])
#
# t = tuple(range(1, 10))
# print(t)

# 元组的相关操作
print('10在元组中是否存在:', (10 in t))
print('10在元组中不存在:', (10 not in t))
print('max:', max(t))
print('min:', min(t))
print('len:', len(t))
print('t.index:', t.index('h'))
print('t.count:', t.count('o'))

x = (10)
print(x, type(x))

y = (10,)  # 元组中只有一个元素，逗号不能省
print(y, type(y))

# 元组的删除
# del t
# print(t)
```

```py
# coding:utf-8
t = ('python', 'hello', 'world')
print(t[0], t)  # 根据索引访问
t2 = t[0:3:2]  # 元组支持切片操作
print(t2)
# 元组的遍历
for item in t:
    print(item)

# for+range()+len()组合遍历
for i in range(len(t)):
    print(i, t[i])

# 使用enumerate()
for index, item in enumerate(t, 11):
    print(index, '--->', item)
```

```py
# coding:utf-8
t=( i for i in range(1,4)) # 结果是一个生成器对象
print(t)
t2 = (1, 2, 3)
print(t2)
#t=tuple(t)
#print(t)
#for item in t:
    #print(item)

# __next__()方法
# print(t.__next__())
# print(t.__next__())
# print(t.__next__())

# print('len():', len(t))
# print('max():', max(t))
# print(t)
# print('min():', min())
#t=tuple(t)
#print(t)
print('-------------', t)
for index, item in enumerate(t):
    print(index, item + 3)
```

**字典的创建与删除**

```py
# coding:utf-8
# (1)直接使用{}创建
# d = {10: 'cat', 20: 'dog', 30: 'pet', 20: 'zoo'}  # key相同，值进行覆盖
# print(d)

# zip函数的使用
# lst1 = [10, 20, 30, 40]
# lst2 = ['cat', 'dog', 'car', 'zoo']
# zipobj = zip(lst1, lst2)  # 映射函数的结果是一个zip对象
# zipobj2 = zip(lst2, lst1)  # 映射函数的结果是一个zip对象
# print(zipobj, type(zipobj), id(zipobj))
# print(zipobj2, type(zipobj2), id(zipobj2))
# print(list(zipobj))
# print(list(zipobj2))
# print(zipobj, type(zipobj), id(zipobj))
# print(zipobj2, type(zipobj2), id(zipobj2))
# d = dict(zipobj)
# print(d)
# d2 = dict(zipobj2)
# print(d2)

# 使用参数创建字典
d = dict(ddd=100, ccc=20)  # 注意事项，参数相当于变量，变量的名字不加引号
print(d, d['ccc'])
# d['cat'] = 30
# print(d, d['cat'])

t = (10, 20, 30)  # 创建一个元组
print({t: 10})

# lst=[10,20,30] # TypeError: unhashable type: 'list'
# print({lst:10}) # 因为列表是可变数据类型

# 字典属于序列类型 根据属性名来判断大小
print('max:', max(d))
print('min:', min(d))
print('len:', len(d))

# 字典的删除
del d['ccc']
print(d)
```

```py
# coding:utf-8
d = {'hello': 10, 'world': 20, 'python': 30}
# 访问字典中的元素
# (1)使用[key]
print(d['hello'])
# （2）使用d.get(key)
print(d.get('hello'))

# 二者之间是有区别的，如果Key不存在时d[key]报错，而使用get(key)可以指定默认值
# print(d['java'])#KeyError: 'java'
print(d.get('java'))  # None
print(d.get('java', '不存在'), d.keys())

# 字典的遍历
for item in d.items():
    print(item)  # key-value组成的一个元组

# 在使用for循环遍历时，分别获取key和value
for key, value in d.items():
    print(key, value)
```

```py
# coding:utf-8
d = {1001: '李梅', 1002: '王华', 1003: '张峰'}
print(d)
# 向字典中添加数据
d[1004] = '张丽丽'  # 直接使用赋值运算符=向字典中添加元素
print(d)

# 获取字典中所有的key
keys = d.keys()  # d.keys()结果是dict_keys ，Python中的一种内部数据类型， 专用于表示字典的key
# 如果希望更好的显示数据，可以使用list或者tuple转成相应的数据类型

print(keys)
print(list(keys))
print(tuple(keys))

# 获取字典中所有的value
values = d.values()
print(values)  # dict_values
print(list(values))
print(tuple(values))

# 字典遍历的时用到的一个方法items
items = d.items()  # dict_items
print(items)
print(list(items))
print(tuple(items))

lst = list(items)  # 将字典中的数据转成键-值对的形式，以元组的方式进行展示
print(lst)

# 直接可以使用dict函数将[(1001, '李梅'), (1002, '王华'), (1003, '张峰'), (1004, '张丽丽')]转成字典
d = dict(lst)
print(d)

# 使用pop函数
print(d.pop(1001))
print(d)
print(d.pop(1008, '不存在'))  # 如果Key不存在，结果输出默认值"不存在"

# 随机删除
print(d.popitem())  # 先获取key-value对
print(d)

# 清空字典中所有的元素
d.clear()
print(d)

# Python中一切皆对象，而每一个对象都一个布尔值
print(bool(d))  # 空字典的bool值为False
```

```py
# coding:utf-8
import random
d={item :random.randint(1,100) for item in range(4)}
print(d)

#创建两个列表
lst=[1001,1002,1003]
lst2=['陈梅梅','王一一','李丽丽']
d={key:value for key,value in zip(lst,lst2)}
print(d)
```

**集合的创建与删除**

```py
# coding:utf-8
#使用{}直接创建集合
s={10,20,30,40}
print(s)
#s={[10,20],[30,40]}#TypeError: unhashable type: 'list'
#s={([10,20]),([20,30])}
print(s)

s={} # 创建的是字典还是集合呢？
print(type(s)) #<class 'dict'>字典

#如何创建空集合
s=set()
print(type(s),bool(s))

# 第二种创建集合的方式set()
s=set('helloworld')
s2=set([10,20,30])
s3=set(range(1,10))
print(s)
print(s2)
print(s3)

#集合属于序列中的一种
print('max:',max(s3))
print('min:',min(s3))
print('len:',len(s3))

print('9在集合中是否存在?',(9 in s3))
print('9在集合中不存在?',(9 not in s3))

#集合的删除
del s3
# s3 = 4
print(s3) #NameError: name 's3' is not defined
```

**集合的操作符**

```python
# coding:utf-8
A={10,20,30,40,50}
B={30,50,88,76,20}


# 交集操作
print(A&B)

#并集
print(A|B)

#差集
print(A-B)

#补集
print(A^B)
```

**集合的相关操作**

```py
# coding:utf-8
s={10,20,30}
#向集合中添加元素
s.add(100)
print(s)
#删除元素
s.remove(20)
print(s)

#清除集合中所有元素
#s.clear()
#print(s,'空集合的布尔值:',bool(s))

#遍历集合
for item in s:
    print(item)

sum = 0
for index,item in enumerate(s,10):  #10表示的是元素的序号，不是索引，从几开始可以自定义
    sum += item
    print(index,'-->',item)

#集合的生成式
s={i for i in range(10)}
print(s)

s={i for i in range(10) if i%2}
print(s)
```
