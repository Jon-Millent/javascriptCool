//选择器
(function(window){
	window.mQ=function(element,node){
		if(/^\#/.test(element)){
			return document.getElementById(element.substring(1));
		}else if(/^\./.test(element)){
			if(document.querySelector){
				return document.querySelectorAll(element);
			}else{
				var elearr=[];
				var the=element.substring(1);
				if(node){
					for(var i=0;i<node.getElementsByTagName('*').length;i++){
						if(node.getElementsByTagName('*')[i].className==the){
							elearr.push(node.getElementsByTagName('*')[i]);
						}
					}	
				}else{
					for(var i=0;i<document.getElementsByTagName('*').length;i++){
						if(document.getElementsByTagName('*')[i].className==the){
							elearr.push(document.getElementsByTagName('*')[i]);
						}
					}	
				}
				return elearr;
			}
		}else if(/^[a-zA-Z]+$/.test(element)){
			return document.getElementsByTagName(element);
		}else{
			console.error('错误的选择器类型，请检查您传的参数');
		}
	}
})(window)
