# 1.4 scr 和 href 的区别是什么?

## 定义

href 是 Hypertext Reference 的简写，表示超文本引用，指向网络资源所在的位置

常见场景：

```html
<a href="http://www.baidu.com"></a>
<link type="text/css" rel="stylesheet" href="common.css" />
```

scr 是 source 的简写，目的是要把文件下载到 html 页面中去。

```html
<img src="img/girl.jpg"></img>
<iframe src="top.html">
<script src="show.js">
```

## 作用结果

1. href 在于当前文档和引用资源之间确立联系
2. src 用于替换当前内容

## 浏览器解析方式

1. 当浏览器遇到 href 会并行下载资源且不会停止对当前文档的处理。(同时也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式)
2. 当浏览器解析到 src，会暂停其他资源的下载和处理，直接将该资源加载或执行完毕。(这也是 script 标签为什么放在底部而不是头部的原因)
