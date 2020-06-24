# 中介者模式

> 中介者模式的定义：通过一个中介者对象，其他所有的相关对象都通过该中介者对象来通信，而不是互相引用，当其中的一个对象发上变化时，只需要通知中介者对象即可。通过中介者模式可以解除对象与对象之间的紧耦合关系。

例如：现实生活中，航线上的飞机只需要和机场的塔台通信就能确定航线和飞行状态，而不需要和所有的飞机通信。同时塔台作为中介者，直到每架飞机的飞行状态，所以可以安排所有的飞机起降和航线安排。

中介者模式适合的场景：例如购物车需求，存在商品选择表单、颜色选择表单、购买数量表单等，都会触发change事件，那么可以通过中介者来转发处理这些事件，实现各个事件的解耦，仅仅维护中介者对象即可。

```js
//手机库存
var goods = {
    'red|32G': 3,
    'red|64G': 1,
    'blue|32G': 7,
    'blue|64G': 6,
};

//中介者
var mediator = (function(){
    var colorSelect = document.getElementById('colorSelect');
    var memorySelect = document.getElementById('memorySelect');
    var numSelect = document.getElementById('numSelect');
    return {
        changed: function(obj) {
            switch(obj){
                case colorSelect:
                    //TODO
                    break;
                case memorySelect:
                    //TODO
                    break;
                case numSelect;
                    //TODO
                    break;
            }
        }
    }
})();

colorSelect.onchange = function() {
    mediator.changed(this)
};
memorySelect.onchange = function() {
    mediator.changed(this)
};
numSelect.onchange =function() {
    mediator.changed(this)
};
```