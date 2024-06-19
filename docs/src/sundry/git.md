# git问题记录

## 概要
欢迎来到 Git 文档！Git 是一款分布式版本控制系统，广泛用于协作开发和版本管理。本文档将帮助你了解 Git 的核心概念、基本操作以及高级技巧。

## 技术细节
`提示：细节实现`

### 1. git命令实训操作网址
[学习git分支](https://oschina.gitee.io/learn-git-branching/)
```shell
https://oschina.gitee.io/learn-git-branching/
```

### 2. git流程/命令行
```shell
git init      # 初始化本地仓库
git clone xxx # 克隆仓库
git add .     # 暂存
git commit -m # 提交更改
git pull      # 抓取分支
git push      # 推送分支
git pull origin master-common    # 从主分支获取提交
git fetch     # 拉取数据、分支等
git branch    # 查看当前分支
git checkout XXX   # 切换本地分支
git cherry-pick XXX   # 将指定的提交（commit）应用于其他分支
git reset --soft HEAD^
```

### 3. commit提交规范
| 类型     |   详细介绍  
| ----------- | :-------: |
|  feat |   新功能、新特性   |
|  fix  |   bugfix，修改问题   |
|  refactor  |   代码重构   |
|  docs  |   文档修改   |
|  style  |   代码格式修改, 注意不是 css 修改   |
|  test  |   测试用例修改   |
|  pref  |   性能提升的修改   |
|  build  |   对项目构建或者依赖的改动   |
|  chore  |   其他修改, 比如构建流程, 依赖管理   |

### 4. git 问题
commit 执行 git reset --hard HEAD^  回退上次提交
```shell
# 先执行，查看提交id
git reflog
# 根据id回退版本
git reset --hard 1f1c92c60
# 查看提交记录
git log
```

### 5. git push后出现错误 ![rejected] master -> master(non-fast-forward)
https://www.cnblogs.com/qingheshiguang/p/14777557.html

https://blog.csdn.net/Lovely_red_scarf/article/details/125760091

https://blog.csdn.net/weixin_42310154/article/details/118340458

https://blog.csdn.net/SweetoRm/article/details/134134559


## 小结
#### 主要特性
- **分布式版本控制**: Git 是一款分布式版本控制系统，每个开发者都可以拥有完整的代码仓库副本，方便离线工作和团队协作。
- **简单易用**: Git 提供了简洁的命令行界面和直观的图形化工具，使得版本控制操作更加容易上手。
- **强大的分支管理**: Git 提供了强大的分支管理功能，可以轻松创建、切换和合并分支，以便同时进行多个任务。
#### 核心优势
- **速度和性能**: Git 能够处理大型项目和大量代码文件，并提供高效的性能和响应速度。
- **数据完整性**: Git 使用校验和机制保证数据的完整性，确保在传输或储存过程中不会损坏或丢失任何数据。
- **灵活性和可定制性**: Git 可以根据项目的需求进行灵活配置和定制，以满足不同开发团队的要求。
#### 目标
Git 的目标是为开发者提供一个高效、可靠的版本控制系统，帮助团队协作和管理代码。我们致力于提供优秀的工具和文档，帮助开发者更好地理解和应用 Git。
