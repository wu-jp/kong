# 1.2 HTML5.0 和 HTML4.0 的区别

## 声明方面

1. HTML5 文件类型声明（<!DOCTYPE>）变成下面的形式

```html
<!DOCTYPE html>
```

## 标准方面

2. HTML5 的文档解析不再基于 SGML(Standard Generalized Markup Language)标准，而是形成了自己的一套标准。

## 标签方面

3. 新增语义化标签，其中包括

```js
  <header>、<main>、<footer>、<section>、<article>、<nav>、<hgroup>、<aside>、<figure>
```

4. 废除一些美化方面的标签，使样式结构分离更加彻底

```js
  <big>、<u>、<font>、<basefont>、<center>、<s>、<tt>
```

5. 增加 video、audio 标签来实现多媒体中的音频和视频使用的支持

## 存储方面

6. 新增 WebStorage，包括 localStorage、sessionStorage

7. 引入了 IndexedDB 和 Web SQL，允许在浏览器端创建数据库表并存储数据, 两者的区别在于 IndexedDB 更像是一个 NoSQL 数据库，而 WebSQL 更像是关系型数据库。W3C 已经不再支持 WebSQL

8. 引入了应用程序缓存器(application cache)，可对 web 进行缓存，在没有网络的情况下使用，通过创建 cache manifest 文件,创建应用缓存，为 PWA(Progressive Web App)提供了底层的技术支持
