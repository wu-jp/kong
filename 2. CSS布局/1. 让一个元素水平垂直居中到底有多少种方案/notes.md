# 让一个元素水平垂直居中方案

## 水平居中

- 对于行内元素: text-align: center;

- 对于确定宽度的块级元素：

  1. width 和 margin 实现。margin: 0 auto;

  2. 绝对定位和 margin-left: -width/2, 前提是父元素 position: relative

- 对于宽度未知的块级元素

  1. table 标签配合 margin 左右 auto 实现水平居中。使用 table 标签（或直接将块级元素设值为 display:table），再通过给该标签添加左右 margin 为 auto。

  2. inline-block 实现水平居中方法。display：inline-block 和 text-align:center 实现水平居中。

  3. 绝对定位+transform，translateX 可以移动本身元素的 50%。

  4. flex 布局使用 justify-content:center

## 垂直居中

1. 利用 line-height 实现居中，这种方法适合纯文字类

2. 通过设置父容器相对定位，子级设置绝对定位，标签通过 margin 实现自适应居中

3. 弹性布局 flex:父级设置 display: flex; 子级设置 margin 为 auto 实现自适应居中

4. 父级设置相对定位，子级设置绝对定位，并且通过位移 transform 实现

5. table 布局，父级通过转换成表格形式，然后子级设置 vertical-align 实现。（需要注意的是：vertical-align: middle 使用的前提条件是内联元素以及 display 值为 table-cell 的元素）。

## 水平垂直居中方案

> **公共 html**

```html
<div class="parent">
  <div class="child"></div>
</div>
```

> **公共 css**

```css
.parent {
  width: 300px;
  height: 300px;
  background-color: chartreuse;
}

.child {
  width: 50px;
  height: 50px;
  background-color: cornflowerblue;
}
```

1. display: flex

```css
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

2. clild 相对 parent 定位

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* 或者 */
.child {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
```

3. display: grid

```css
.parent {
  display: grid;
}

.child {
  align-self: center;
  justify-self: center;
}
```

4. display + margin

```css
.parent {
  display: flex;
}

.child {
  margin: auto;
}
```
