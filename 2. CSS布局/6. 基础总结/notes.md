# 6.0 css 问题集合

## 1. 介绍下标准 css 盒模型？与 IE6 盒模型（给怪异盒子）有什么不同？

- 标准盒模型：宽度 = 内容宽度（content） + border*2 + padding*2 + margin
- IE6 盒模型：宽度 = 内容宽度（content + border*2 + padding*2）+ margin

## 2. box-sizing 属性

> 用来控制元素盒模型的解析模式：默认为 content-box

- context-box：W3C 的标准盒子模型，设置元素的 height/width 属性指的是 content 部分的高/宽

- border-box：IE 传统盒子模型。设置元素的 height/width 属性指的是 border + padding + content 部分的高/宽

## 3. css 选择器有哪些？哪些属性可继承

css 选择器：

> id 选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul > li）、后代选择器（li a）、通配符选择器（\*）、属性选择器（a[rel=”external”]）、伪类选择器（a:hover, li:nth-child）

可继承的属性：

> font-size, font-family, color

## 4. css 权重计算

- 元素选择符： 1

- class 选择符： 10
- id 选择器： 100
- 行间样式： 1000
- !important : 无限大

## 5. css3 新增伪类

- p:first-of-type 选择属于其父元素的首个元素

- p:last-of-type 选择属于其父元素的最后元素
- p:only-of-type 选择属于其父元素唯一的元素
- p:only-child 选择属于其父元素的唯一子元素
- p:nth-child(2) 选择属于其父元素的第二个子元素
- :enabled :disabled 表单控件的禁用状态。
- :checked 单选框或复选框被选中

## 6. display 有哪些属性

- inline（默认）–内联

- none–隐藏
- block–块显示
- table–表格显示
- list-item–项目列表
- inline-block-行级块

## 7. position 的值

- static（默认）：按照正常文档流进行排列；

- relative（相对定位）：不脱离文档流，参考自身静态位置通过 top, bottom, left, right 定位；
- absolute(绝对定位)：参考距其最近一个不为 static 的父级元素通过 top, bottom, left, right 定位；
- fixed(固定定位)：所固定的参照对像是可视窗口。

## 8. CSS3 有哪些新特性

- RGBA 和透明度

- background-image background-origin(content-box/padding-box/border-box) background-size background-repeat
- word-wrap（对长的不可分割单词换行）word-wrap：break-word
- 文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）
- font-face 属性：定义自己的字体
- 圆角（边框半径）：border-radius 属性用于创建圆角
- 边框图片：border-image: url(border.png) 30 30 round
- 盒阴影：box-shadow: 10px 10px 5px #888888
- 媒体查询：定义两套 css，当浏览器的尺寸变化时会采用不同的属性

## 9. 用纯 CSS 创建一个三角形

> 首先，需要把元素的宽度、高度设为 0。然后设置边框样式

```css
div {
  width: 0;
  height: 0;
  border-top: 40px solid transparent;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 40px solid #ff0000;
}
```

## 10. display:none 与 visibility：hidden 的区别

- display：none 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）

- visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘）

## 11. margin 和 padding 分别适合什么场景使用

> 何时使用 margin：

- 需要在 border 外侧添加空白

- 空白处不需要背景色

- 上下相连的两个盒子之间的空白，需要相互抵消时。

> 何时使用 padding：

- 需要在 border 内侧添加空白

- 空白处需要背景颜色

- 上下相连的两个盒子的空白，希望为两者之和

## 12. overflow 属性定义元素溢出内容区有哪些值

- scroll 必会出现滚动条

- auto 子元素内容大于父元素时出现滚动条
- visible 溢出的内容出现在父元素之外
- hidden 溢出隐藏
