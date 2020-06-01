# 2.3 display: inline-block 会产生哪些问题

## 问题

问题: 两个 display：inline-block 元素放到一起会产生一段空白。

代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .container {
        width: 800px;
        height: 200px;
      }

      .left {
        font-size: 14px;
        background: red;
        display: inline-block;
        width: 100px;
        height: 100px;
      }

      .right {
        font-size: 14px;
        background: blue;
        display: inline-block;
        width: 100px;
        height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="left">
        左
      </div>
      <div class="right">
        右
      </div>
    </div>
  </body>
</html>
```

效果如下：

![Alt text](./1.png)

## 产生空白的原因

元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据 CSS 中 white-space 属性的处理方式（默认是 normal，合并多余空白），原来 HTML 代码中的回车换行被转成一个空白符，在字体不为 0 的情况下，空白符占据一定宽度，所以 inline-block 的元素之间就出现了空隙。

## 解决办法

1. 将子元素标签的结束符和下一个标签的开始符写在同一行或把所有的子标签写在同一行

   ```html
   <div class="container">
     <div class="left">
       左
     </div>
     <div class="right">
       右
     </div>
   </div>
   ```

2. 父元素中设置 font-size: 0，在子元素上重置正确的 font-

   ```css
   .container {
     width: 800px;
     height: 200px;
     font-size: 0;
   }
   ```

3. 为子元素设置 float:left

   ```css
   .left {
     float: left;
     font-size: 14px;
     background: red;
     display: inline-block;
     width: 100px;
     height: 100px;
   }
   /* right是同理 */
   ```
