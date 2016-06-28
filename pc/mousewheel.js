function mousewheel(obj,fn){
	if(typeof obj.onmousewheel!=undefined){
		obj.onmousewheel=function(e){
			var ev=e||window.event;
			fn(ev,ev.wheelDelta/Math.abs(ev.wheelDelta))
		}
	}else{
		obj.addEventListener('DOMMouseScroll',function(e){
			fn(e,-e.detail/Math.abs(e.detail))
			
		},false)
	}
}
