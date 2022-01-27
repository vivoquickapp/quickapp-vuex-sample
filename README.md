<h1 align="center">QUICKAPP VUEX SAMPLE</h1>

<div align="center">
  <strong>
  基于 Vuex 开发出的任务管理<a href="https://nicelinks.site/post/5b5fb5bc615bf842b609105f">快应用</a>：待办清单；它的目标是将任务从您的脑海中移到任务清单，让你专注于当前的工作。
  </strong>
</div>

## 目标与哲学

[快应用](https://nicelinks.site/post/5b5fb5bc615bf842b609105f)语法本身提供[兄弟跨级组件通信](https://doc.quickapp.cn/tutorial/framework/parent-child-component-communication.html#兄弟跨级组件通信)、全局变量、[props](https://doc.quickapp.cn/tutorial/framework/props.html) 等能力；但不同程度上，都存在些许问题：

1. 开发者实现 Pub/Sub（订阅）模型：虽然完成了解耦，但操作繁琐；
2. 利用框架本身提供的事件绑定接口：耦合性高，不够扁平化，难以维护；

如果您考虑通过`全局变量`或 props 跨层级传递的方式，但其弊端相对会更多。在某些复杂业务场景，采取**状态模型**，基于事件操作驱动数据，基于数据变化更新界面；最合适不过了。在众多状态机相关类库中，有开发者对 vuex 进行了快应用适配：[qa-vuex](https://github.com/nicejade/vuex)（**支持了几乎所有的功能，支持 computed, watch, methods**）。这是一个示例项目，运用 vuex 进行状态管理，用以**解决「兄弟跨级组件通信问题」**，同时，**降低代码之间的耦合性**。

我们每天要做的事情都很多，经常会出现想做某个事然后忘掉的情况；待办清单，可以帮我们把要做的事情列出来，一项一项，类似思维导图。把要做的事情在「待办清单」上记录下来，辅之以提醒，就不会轻易忘记。并且，基于它可以让我们实时看到自己已经完成了哪些任务，获得即时满足感；还有哪些任务未完成，更好的规划自己的时间。这里的「待办清单」只是一个模版，提供一些基本功能；您可以在这些基础功能上，自由开发属于自己的 ToDoList 应用。

## 先决条件

安装[快应用开发工具](https://www.quickapp.cn/docCenter/IDEPublicity)，提供了开发快应用所需要的功能，无需额外安装其它工具和环境。

## 目录介绍

```
└── src
│   ├── assets          # 公用的资源(Images/Styles/字体...)
│   │   ├──images       # 存储 png/jpg/svg 等公共图片资源
│   │   └──styles       # 存放 less/css/ 等公共样式资源
│   ├── components      # 存放项目所抽离出的组件
│   ├── helper          # 项目自定义辅助各类工具
│   ├── pages           # 统一存放项目页面级代码
│   ├── store           # 存放 vuex（store）相关内容
│   ├── app.ux          # 应用程序代码的入口文件
│   └── manifest.json   # 配置应用基本信息
└── package.json        # 定义项目需要的各种模块及配置信息
```

## 项目功能

- [x] 支持一键添加**新任务**；
- [x] 标注**已完成**任务（向左滑动）；
- [x] 支持删除单项任务（向左滑动）；
- [x] 一键删除已完成任务；
- [x] 查看全部、已完成、未完成任务；


## 注意事项

在组件开发中过程中，遇到了些问题，以下几点值得您注意下：

* `tasks-list` 组件展示添加任务，当任务名过长时，如果设置超出部分显示为省略号；本地预览会出现错误，整行都会显示为省略号，已提交 bug 但还未修复；
* 使用 slide-view 组件时，slide-view 组件的 enableslide 属性（是否允许侧滑）默认是 true，可以不添加；但本地预览如果不设置为 true，slide-view 组件将会不能侧滑；
* 本地预览，slide-view 组件中按钮组，点击会报错，已提交 bug 但还未修复。可以采用 touch 方法或者换一种表现形式，来实现侧滑点击功能。

## License

[MIT](http://opensource.org/licenses/MIT) 