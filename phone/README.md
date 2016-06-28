#对于手机端的事件兼容

##  touchstart
**这里的touchstart被封装成 "mousedown" 是不是很亲切？**
```javascript
$(element).mousedown(function(event){
  console.log(event)
})
```
##  touchend
** touchend---mouseup **
```javascript
$(element).mouseup(function(event){
  console.log(event)
})
```
##  mousemove
** touchmove --- mousemove **
```javascript
$(element).mousemove(function(event){
  console.log(event)
})
```
##  scroll

```javascript
$(element).scroll(function(event){
  console.log(event)//这里是在滑动的时候触发
},function(event,b){
  console.log(event,b)//这里在滑动结束的时候触发 获得event对象 和滑动方向 1 /-1 (这很像mousewheel)
})
```
**其他的返回发不再一一赘述门这里主要是对事件的封装**
