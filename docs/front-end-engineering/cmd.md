# CMD 文件&目录常用命令速查表

## 一、目录操作

| 命令              | 说明                      |
| ----------------- | ------------------------- |
| `dir`             | 查看当前目录文件          |
| `dir /w`          | 紧凑列表查看              |
| `cd 路径`         | 进入指定目录 `cd d:\code` |
| `cd ..`           | 返回上一级                |
| `cd \`            | 回到当前盘符根目录        |
| `D:`              | 切换 D 盘盘符             |
| `md 文件夹名`     | 新建文件夹 `md demo`      |
| `md a\b\c`        | 一次性创建多级目录        |
| `rd 文件夹`       | 删除空文件夹              |
| `rd /s /q 文件夹` | 强制删除带内容文件夹      |
| `tree`            | 树形展示目录              |
| `tree /f`         | 树形+列出所有文件         |

## 二、文件创建、写入、读取

### 1. 创建空文件

```cmd
type nul > index.txt
# > 覆盖：文件存在直接清空
```

### 2. 文件写入

```cmd
# > 覆盖写入：存在清空再写入，不存在新建
echo 内容 > test.txt

# >> 追加写入：存在末尾新增，不存在新建
echo 内容 >> test.txt
```

> 注意：`echo > a.txt` 生成带换行的非空文件，不能做空文件。

### 3. 查看文件内容

```cmd
type test.txt
```

### 4. copy con 多行快速写入

```cmd
copy con test.txt
内容1
内容2
Ctrl+Z + 回车 保存
```

## 三、文件移动/复制/删除

```cmd
copy a.txt d:\demo\      ::复制
move a.txt d:\demo\      ::移动
del a.txt                ::删除单个文件
del *.txt                ::批量删除所有txt
```

## 四、系统快捷命令

```cmd
cls       ::清屏
exit      ::关闭cmd
ver       ::查看系统版本
```

## 五、实操示例整套流程

```cmd
md demo
cd demo
type nul > index.txt
echo hello cmd >> index.txt
type index.txt
```

需要我再补充 **> 和 >> 符号记忆口诀**吗？
