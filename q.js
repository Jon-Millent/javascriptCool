(function(window){
	//初始化

	Function.prototype.bind = function (scope) {
	    var fn = this;
	    return function () {
	        return fn.apply(scope);
	    };
	}

	//结束
	function Tool(node){
		this.node=node;
		this.config={
			version:'1.0.0',
			debug:'0'
		}
	}
	Tool.extend=Tool.prototype.extend=function(fn){
		for (var i in fn){
			if(!Tool.prototype.hasOwnProperty(i)){
				Tool.prototype[i]=fn[i];
			}
		}
	};
	Tool.prototype={
		constructor:Tool,
		on:function(type,fn){
			this.node.lib=this.node.lib||{};
			this.node.lib[type]=this.node.lib[type]||[];
			this.node.lib[type].push(fn)
			if(this.node.addEventListener){
				this.node.addEventListener(type,fn,false)
			}else{
				this.node.attachEvent('on'+type,fn);
			}
		},
		off:function(type){
			if(this.node.removeEventListener){
				this.node.removeEventListener(type,fn,false);
			}else{
				this.node.detachEvent('on'+type,fn);
			}
		},
		hasClass:function(name){
			return this.node.className.split(' ').indexOf(name) == -1 ? false : true;
		},
		addClass:function(name){
			if(!this.hasClass(this.node,name)){
				if(!this.node instanceof Array){
					this.node.className=this.node.className+' '+name;
				}else{
					for(var i=0;i<this.node.length;i++){
						this.node[i].className=this.node[i].className+' '+name;
					}
				}
			}
		},
		removeClass:function(name){
			if(this.hasClass(this.node,name)){
				var classlist=this.node.className.split(' ');
				for(var i=0;i<classlist.length;i++){
					if(classlist[i]==name){
						classlist.splice(i,1);
					}
				}
				this.node.className=classlist.join(' ');
			}
		},
		css:function(attr,value) {
		    switch (arguments.length) {
		        case 2:
		            if (typeof arguments[1] == "object") { 
		                for (var i in attr) this.node.style[i] = attr[i]
		            }
		            else { 
		                return this.node.currentStyle ? this.node.currentStyle[attr] : getComputedStyle(this.node, null)[attr]
		            }
		            break;
		        case 3:
		            this.node.style[attr] = value;
		            break;
		        default:
		            return "";
		    }
		},
		documentReady:function (callback) {
		    if (document.addEventListener) {
		        document.addEventListener('DOMContentLoaded', function () {
		            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
		            callback();
		        }, false)
		    }
		    else if (document.attachEvent) {
		        document.attachEvent('onreadytstatechange', function () {
		              if (document.readyState == "complete") {
		                        document.detachEvent("onreadystatechange", arguments.callee);
		                        callback();
		               }
		        })
		    }
		    else if (document.lastChild == document.body) {
		        callback();
		    }
		}
	};
	window.q=function(element,node){
		if(/^\#/.test(element)){
			return document.getElementById(element.substring(1));
		}else if(typeof element!='String'){
			return element
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
				return new elearr;
			}
		}else if(/^[a-zA-Z]+$/.test(element)){
			return document.getElementsByTagName(element);
		}else{
			console.error('Selector Type Error');
		}
	}	
})(window)
