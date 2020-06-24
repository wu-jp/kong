# 008：HTTP如何处理大文件的传输？

对于几百兆甚至上G的文件来说，如果一口气全部传输过来显然是不现实的，会有大量的等待时间，严重影响用户体验。因此，HTTP针对这一场景，采取了`范围请求`的解决方案，允许客户端仅仅请求一个资源的一部分。

## 如何支持

当然，前提是服务器要支持`范围请求`，要支持这个功能，就必须加上这样一个响应头：

```http
Accept-Ranges: none
```

来告知客户端这边是支持范围请求的。

## Ranges 字段拆解

而对于客户端而言，他需要指定请求那一部分，通过`Range`这个字段确定，格式为`bytes=x-y`。
接下来就来讨论下这个 Range 的书写格式：

- 0-499表示从开始到499个字节
- 500-表示从第500字节到文件终点
- -100表示文件的最后100个字符

服务器收到请求后，首先验证范围是否合法，如果越界了那么返回`416`错误码，否则读取相应片段，返回`206`状态码。

同时，服务器需要添加`Content-Range`字段，这个字段的格式根据请求头中的`Range`字段的不同而有所差异。

具体来说，请求`单段数据`和`多段数据`，响应头是不一样的。

举个栗子🌰：

```http
//单段数据
Range: bytes=0-9
//多段数据
Range: bytes=0-9, 30-39
```

接下来我们就分别来讨论着两种情况.

## 单段数据

对于单段数据的请求，返回的响应如下:

```http
HTTP/1.1 206 Partial Content
Content-Length: 10
Accept-Ranges: bytes
Content-Range: bytes 0-9/100

i am xxxxx
```

值得注意的是`Content-Range`字段，`0-9`表示请求的返回，`100`表示资源的总大小，很好理解。

## 多段数据

接下来我们看看多段请求的情况。得到的响应会是下面这个形式：

```http
HTTP/1.1 206 Partial Content
Content-Type: multipart/byteranges; boundary=00000010101
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes


--00000010101
Content-Type: text/plain
Content-Range: bytes 0-9/96

i am xxxxx
--00000010101
Content-Type: text/plain
Content-Range: bytes 20-29/96

eex jspy e
--00000010101--
```

这个时候出现一个非常关键的字段`Content-Type: multipart/byteranges;boundary=00000010101`，他表示了信息量是这样的：

- 请求一定是多段数据请求
- 响应体中的分隔符是00000010101

因此，在响应体中各段数据之间会由这里指定的分隔符分开，而且在最后的分隔符末尾添上`--`表示结束。

以上就是http针对大文件传输所采取的手段。
