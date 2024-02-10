# git

<hr/>

## gitignore匹配规则

`dist` ---> 匹配项目下所有`dist`文件/文件夹

`a/dist` 或者 `/a/dist` ---> 从`gitignore`当前目录出发，找到`a`文件夹下的`dist`文件/文件夹

`/dist` ---> 匹配`gitignore`同层级目录下的`dist`文件夹/文件。同层级`a/dist`不匹配。同层级下的`dist`文件夹和文件都匹配

`/dist/` ---> 匹配`gitignore`同层级下的文件夹，名为`dist`的文件不匹配

`*` 匹配字符串，但是不能匹配斜杆

`*.jpg` ---> 匹配所有jpg图片

`/a/*.jpg` ---> 匹配`a`文件夹下的所有`jpg`图片，但是`/a/sub/test.jpg`不能匹配

`/a/**/*.jpg` ---> 匹配任意层级目录下的`jpg`图片

`/upload/**/*.*` 匹配upload文件夹下的所有文件
但是github可能觉得upload排除所有，没有文件就不上传了，那么文件夹就没了，我们需要排除所有，但是目录保留。比如upload文件夹下有一个sub文件夹，建立一个空文件`.gitkeep`，希望文件不要被排除。
修改匹配规则
`/upload/**/*.*`
`!/upload/.gitkeep`

## 学习网站

```css
https: //learngitbranching.js.org/?locale=zh_CN;;
```

## 连接git仓库

### 具体描述

在github上建了一个新的仓库（无任何文件），`URL（ssh）`如下：

```css
git@github.com:Garril/test.git
```

要如何在本地与他建立连接

### 流程

```css
/*  create a new repository  */
git init
git add README.md(自选)
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:Garril/test.git
git push -u origin main


/*  push an existing repository  */
git remote add origin git@github.com:Garril/test.git
git branch -M main
git push -u origin main
```

<hr/>

## 本地和远程的版本不一致

### 具体描述

我github上，别人commit了，或者自己加了个README.md，

本地和远程的版本不一致了。这个时候你想到了

### 流程

1、`git fetch`可以从远程代码仓库获取最新代码。

2、可以使用`git status`命令查看本地分支与远程分支的差异。

3、如果发现本地分支落后于远程分支，使用`git pull`命令将 远程分支 合并到 本地分支

4、完成代码合并后，使用`git add`和`git commit`命令将本地修改提交到本地分支。

5、`git push`

### 注意

`git fetch`命令不会更新本地分支，因为该命令只是从远程存储库中获取和下载最新的提交和对象，

但不会自动将它们合并到您的本地分支中。（你要直接`pull`）

如果你想将 远程分支 合并 到本地分支：

```css
git merge origin/yourBranchName
```

其中`origin` 是远程存储库的名称， `yourBranchName` 是要合并的远程分支的名称。

`orgin`可以通过 ` git remote -v` 查看，如下：

```css
origin  git@github.com:Garril/daily_notes.git (fetch)
origin  git@github.com:Garril/daily_notes.git (push)
```

但是，一般`orgin`在初次 `remote`之后，都会做个映射，直接写`origin`即可，

(使用`git clone`命令克隆了一个现有的Git存储库，那么此存储库也将默认为“origin”。)

`yourBranchName`我个人使用时为`main`

所以执行：

```css
git merge origin/main
```

然而，如果你想丢弃本地更改并强制更新本地分支：

```css
git reset --hard origin/yourBranchName
```

变量如上。

## 修改/添加其他远程存储库

### 具体描述

我在`git remote -v`之后，看到了当前连接的所有远程存储库的详细信息，包括它们的名称和URL

但是我想更改、添加、删除其他远程存储库

### 操作

更改、添加远程存储库

```css
git remote add <name> <url>
```

`<name>` 是你要分配给新远程存储库的名称， `<url>` 是新存储库的URL。

删除远程存储库

```css
git remote remove <name>
```

在这里， `<name>` 是要删除的远程存储库的名称。

<hr/>

## 分支

### 创建分支

```css
git branch <branch-name>
创建并且切换过去
git checkout -b <branch-name>
```

### 当前分支

```css
git branch
可以看看是master还是main，现在一般为main。正常情况下代表最新分支
```

### 切换分支

```css
git checkout <分支名/commit版本号>
git log 可以看版本号
```

```css
main^ 相当于“main 的父节点”
main^^ 是 main 的第二个父节点
HEAD同理，可以不断使用 git checkout HEAD^ 向上移动
分支名也可以，比如：
git checkout bugFix^
```

当前`main`所在为`C2`执行：

```css
git checkout main^
```

`head`指向 `C1` 、 `main`指向 `C2`

当你需要checkout多个版本，可以直接写数字，比如：

```css
git checkout HEAD~4
```

相对引用最多的就是移动分支，直接使用 `-f` 选项让分支指向另一个提交

将 main 分支强制指向 HEAD 的第 3 级父提交

```css
git branch -f main HEAD~3
```

注意：我们使用`git checkout main^` 和 `git checkout HEAD~4`，改变的都是`HEAD`

要改变分支，比如`main`和`bugFix`，都要用`git branch -f 分支名 分支名~num/版本名-c0c1c2c3`

```css
C0 -> C1 -> C3(main*)
	 -> C2

git checkout main^   默认HEAD指向C1
git checkout main^2  HEAD指向C2

这里决定1行2行，看的是最新的一次提交，比如
第一行最新提交是C4，那么第二行最新一次提交必须是C5以及C5以上
```

### 删除分支

```css
git branch -D 分支名
```

### 创建分支

```css
基于 main 分支创建新的 feature/image-upload 分支

git checkout -b feature/image-upload
（git push origin feature/image-upload）

这个命令首先会强制删除 feature/image-upload 分支上的所有更改，并使其不可恢复。
然后，通过 checkout 命令重新创建一个名为 feature/image-upload 的新分支，这个分支将基于 main 分支的最新代码进行构建。
```

### 强制push

```css
git push -f origin 分支名
```

### 重命名本地分支

```css
比如master改为main

git checkout master
git branch -M main

推送本地 main 分支到远程仓库并将其设为默认主分支。

git push -u origin main
git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main

第二个命令是告诉远程仓库更改了它要跟踪的主分支，在这里是 main。
如果该命令成功执行，下次执行 git pull 命令时将会自动获取远程仓库上的 main 分支中最新的代码。
现在您已经成功将本地的 master 分支重命名为 main 并将其推送到远程仓库作为主分支。
但是请注意此操作可能会影响其他协作者的工作流程，请确认其所需的步骤，并与其他协作者协商和同意再执行此操作。
```

### 合并分支

```css
git merge bugFix

再把 main 分支合并到 bugFix：
	git checkout bugFix; git merge main
	因为 main 继承自 bugFix，Git 什么都不用做，只是简单地把 bugFix 移动到 main 所指向的那个提交记录。
```

![image-20230511141505667](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230511141505667.png)

第二种合并分支的方法是 `git rebase`。

Rebase 实际上就是取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去。

![image-20230511142053630](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230511142053630.png)

我们想要把 bugFix 分支里的工作直接移到 main 分支上。

移动以后会使得两个分支的功能看起来像是按顺序开发，但实际上它们是并行开发的。

```css
左图：当前分支为bugFix
执行：git rebase main
```

注意，提交记录 C3 依然存在（树上那个半透明的节点），而 C3' 是我们 Rebase 到 main 分支上的 C3 的副本。

之后再执行

```css
git checkout main
git rebase bugFix
```

由于 `bugFix` 继承自 `main`，所以 Git 只是简单的把 `main` 分支的引用向后移动了一下而已。

也就是：现在main指向的也是c3'，和bugFix一样

<hr/>

## head

对比main，main可以理解为：当前最新节点

head为，当前指向的节点。

### 查看head指向

```css
cat .git/HEAD

git symbolic-ref HEAD
```

### 分离的 HEAD

分离的 `HEAD` 就是让其指向了某个具体的提交记录而不是分支名。

```
git checkout C1; git checkout main; git commit; git checkout C2;
```

![image-20230511145032496](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230511145032496.png)

```css
左图为 HEAD -> main -> C1
右图 不是 HEAD -> main -> C2，而是 HEAD -> C2、main -> C2
```

## 版本回退

![](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230511155248320.png)

### 本地分支

看左图

执行前：`C0 -> C1 -> C2(main*)`

执行：

```css
git reset HEAD~1
```

执行后：`C0 -> C1(main*)`，把 main 分支移回到 `C1`；现在我们的本地代码库根本就不知道有 `C2` 这个提交了。

在 `reset `后，`C2` 所做的变更还在，但是处于未加入暂存区状态。

但是这种方法，对大家一起使用的远程分支是无效的

### 远程分支

看右图

在我们要撤销的提交记录后面，多了一个新提交。

新提交记录 `C2'` 引入了**更改** —— 这些更改刚好是用来撤销 `C2` 这个提交的。也就是说 `C2'` 的状态与 `C1` 是相同的。

```css
git revert HEAD
```

## Cherry-pick

```css
git cherry-pick <提交号>...
```

我们想将 `side` 分支上的工作复制到 `main` 分支。

```css
git cherry-pick C2 C4
```

我们只需要提交记录 `C2` 和 `C4`，所以 Git 就将被它们抓过来放到当前分支下了。

这里的C2和C4，也可以来自不同的分支。

![image-20230511160846370](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230511160846370.png)

上面的`C1、C2、C3。。。。。`都是指的某个版本的`hash`值

但是如果你不清楚你想要的提交记录的哈希值，怎么找？

可以利用交互式的 rebase —— 如果你想从一系列的提交记录中找到想要的记录, 这就是最好的方法了

### 技巧

cherry-pick 可以将提交树上任何地方的提交记录取过来追加到 HEAD 上（只要不是 HEAD 上游的提交就没问题）。

```css
C0 -> C1 -> C2（bugFix）

				-> C3（main*）


git cherry-pick C2


C0 -> C1 -> C2（bugFix）

				-> C3 -> C2'（main*）
```

## rebase

`-i`

如果你在命令后增加了这个选项, Git 会打开一个 UI 界面并列出将要被复制到目标分支的备选提交记录，

它还会显示每个提交记录的哈希值和提交说明，提交说明有助于你理解这个提交进行了哪些更改。

```css
git rebase -i HEAD~4
```

ui界面选择删除某个节点，调整节点顺序。

其余节点copy到另一条分支，原先分支节点全透明

### 例子

你之前在 `newImage` 分支上进行了一次提交，然后又基于它创建了 `caption` 分支，然后又提交了一次。

此时你想对某个以前的提交记录进行一些小小的调整。比如设计师想修改一下 `newImage` 中图片的分辨率，尽管那个提交记录并不是最新的了。

![image-20230511163550228](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230511163550228.png)

- 先用 `git rebase -i` 将提交重新排序，然后把我们想要修改的提交记录挪到最前（C3和C2换）

此时C2（newImage），C3灰色，另开分支 （ C3' -> C2' ---caption\* ）

- 然后用 `git commit --amend` 来进行一些小修改（C2'）

C3' 下 原本 -> C2'，现在多出一条 -> C2''

- 接着再用 `git rebase -i` 来将他们调回原来的顺序

生成C2''' -> C3''的路线

- 最后我们把 main 移到修改的最前端

## tag

先建立一个标签，指向提交记录 `C1`，表示这是我们 1.0 版本。

如果你不指定提交记录，Git 会用 `HEAD` 所指向的位置。

```css
git tag v1 C1
```

## describe

![image-20230511170217644](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230511170217644.png)

## 远程

### clone

```css
git clone 地址

两branch
	main*
	o/main 或者 origin/main

远程分支有一个命名规范 —— 它们的格式是:
	<remote name>/<branch name>
当你用 git clone 某个仓库时，Git 已经帮你把远程仓库的名称设置为 origin 了
```

```css
执行前：C0 -> C1(main*、o/main)
执行：git checkout o/main; git commit;
执行后：C0 -> C1(main*、o/main) -> C2(HEAD)
```

Git 变成了分离 HEAD 状态，当添加新的提交时 `o/main` 也不会更新。这是因为 `o/main` 只有在远程仓库中相应的分支更新了以后才会更新。

### fetch

将本地仓库中的远程分支更新成远程仓库相应分支最新的状态

```css
git fetch
```

- 从远程仓库下载本地仓库中缺失的提交记录
- 更新远程分支指针(如 `o/main`)
- 并不会改变你本地仓库的状态。它不会更新你的 `main` 分支，也不会修改你磁盘上的文件。
- 理解为单纯的下载操作。

当时o/main以及o/fetch等远程分支有了，本地对应分支需要自己切换。

### merge

当远程分支中有新的提交时，你可以像合并本地分支那样来合并远程分支。也就是说就是你可以执行以下命令:

- `git cherry-pick o/main`
- `git rebase o/main`
- `git merge o/main`

配合 `git merge`

```css
git fetch; git merge o/main;
```

![image-20230511175408157](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230511175408157.png)

`git pull` 就是 `git fetch` 和 `git merge` 的缩写

### 团队

```css
假设自定义命令 fakeTeamwork 默认操作就是在远程仓库的 main 分支上做一次提交
git fakeTeamwork

远程：
	C0 -> C1(main)
变为：
	C0 -> C1 -> C2(main)
```

模拟队友推送了 3 个提交记录到远程仓库的 foo 分支。

```css
git frameTeamwork foo 3

远程：
	C0 -> C1(main、foo)
变为：
	C0 -> C1 -> C2 -> C3 -> C4(foo)
```

步骤：

​ 克隆一个远程仓库（用 `git clone`），

​ 再在刚创建的远程仓库中模拟一些修改，git frameTeamWork xxx num

​ 然后在你自己的本地分支上做一些提交，git commit

​ 再拉取远程仓库的变更。 git fetch，git merge

### push

```css
git push
```

执行之后 `main、o/main`均指向 本地最新的版本

假设你周一克隆了一个仓库，然后开始研发某个新功能。

到周五时，你新功能开发测试完毕，可以发布了。

但是 —— 天啊！你的同事这周写了一堆代码，还改了许多你的功能中使用的 API，这些变动会导致你新开发的功能变得不可用。

但是他们已经将那些提交推送到远程仓库了，因此你的工作就变成了基于项目**旧版**的代码，与远程仓库最新的代码不匹配了

![image-20230511183700694](https://forupload.oss-cn-guangzhou.aliyuncs.com/newImg/image-20230511183700694.png)

图一：执行 `git push`

命令失败了！`git push` 失败是因为你最新提交的 `C3` 基于远程分支中的 `C1`。

而远程仓库中该分支已经更新到 `C2` 了，所以 Git 拒绝了你的推送请求。

如何解决这个问题呢？你需要做的就是使你的工作基于最新的远程分支

最直接的方法就是通过 rebase 调整你的工作。

执行前，图二

```css
git fetch; git rebase o/main; git push;
```

执行后，看图三。

其它的方法：`git merge`

`git merge` 不会移动你的工作（它会创建新的合并提交），

但是它会告诉 `Git` 你已经合并了远程仓库的所有变更。

这是因为远程分支现在是你本地分支的祖先，也就是说你的提交已经包含了远程分支的所有变化。

```css
git fetch; git merge o/main; git push
```

更简单一点的: `git pull`

`git pull` 就是 fetch 和 merge 的简写，类似的 `git pull --rebase` 就是 fetch 和 rebase 的简写

```css
git pull
```

### 策略配置

远程服务器拒绝直接推送`(push)`提交到`main`, 因为策略配置要求` pull requests` 来提交更新.

解决方法：

​ 新建一个分支feature, 推送到远程服务器.

​ 然后reset你的main分支和远程服务器保持一致, （用git branch -f 调整)，之后不需要git push

​ 否则下次你pull并且他人的提交和你冲突的时候就会有问题.

## 实际

### 公用一个仓库，不同分支

基本流程

```css
git clone 拉仓库

git branch 看分支，默认为master

git checkout -b test-branch 切换且创建test-branch分支 （需要git仓库有对应分支才可以push）

写代码，add、commit，git status看状态，

push（直接git push失败，他默认远端的master分支去push）
git push origin test-branch

合并分支
git checkout master（转换分支）
git pull（更新下master分支）
git merge test-branch（test-branch合并到master分支，可能有冲突 -- 本地合并）
git push
```

### 主仓库不直接开发，成员fork，然后开发合并

基本流程

```css
fork主仓库到自己git，git clone自己仓库地址
写代码，git add、commit、push
到github创建pull request
```

### push失败

```css
基本就是两种情况：
1、没权限
2、本地可能比线上落后一个版本的代码
```

### 什么时候会有冲突

```css
比方说现在方法为：“公用一个仓库，不同分支”
线上版本d，本地拉了d
本地完成功能e提交，但是提交前，线上更新到了m
这个时候本地是基于版本d修改，而不是m，所以push会报错。
这个时候到主分支master去git pull，会看到冲突报错
（是否有冲突，取决于e和m的修改，是否在同一文件的同一个区域）
	CONFLICT （content）: Merge conflict in src/xxx.js
	Automatic merge failed: fix conflicts and then commit the result.
到js文件中去修改
<<<<< HEAD(本地)
console.log(1);
===== (线上)
console.log(2);
<<<<< 034xada....版本号

和冲突的人商量保留的部分，解决冲突

git pull。git add、commit、push
```
