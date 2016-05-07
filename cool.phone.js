(function(window){
	var q={
		ready:function(callback) {
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
		},
		css:function(node,attr,value) {
		    switch (arguments.length) {
		        case 2:
		            if (typeof arguments[1] == "object") { 
		                for (var i in attr) node.style[i] = attr[i]
		            }
		            else { 
		                return node.currentStyle ? node.currentStyle[attr] : getComputedStyle(node, null)[attr]
		            }
		            break;
		        case 3:
		            node.style[attr] = value;
		            break;
		        default:
		            return "";
		    }
		},
		hasClass:function(node,name,type){
		    var arr=node.className.split(' ');
		    var isFind=false;
		    for(var i =0;i<arr.length;i++){
		        if(arr[i]==name){
		            isFind=true;
		        }
		    }
		    if(type){
		        return [isFind,arr];
		    }else{
		        return isFind;
		    }
		},
		addClass:function(obj,cls){
		    if(!this.hasClass(obj,cls)){
		        obj.className+=(" "+cls);
		    }
		},
		removeClass:function(node,name){
		    if(this.hasClass(node,name,true)[0]){
		        var arr=this.hasClass(node,name,true)[1];
		        for(var i=0;i<arr.length;i++){
		            if(arr[i]==name){
		                arr.splice(i,1);
		            }
		        }
		        node.className=arr.join(' ');
		    }
		},
		on:function(node,type,fn){
			node.lib=node.lib||{};
			node.lib[type]=node.lib[type]||[];
			node.lib[type].push(fn)
			node.addEventListener(type,fn,false)
		},
		pao:function(e,type,fn){
			var ev=e||window.event;
			var tag=ev.target||ev.srcElement;
			if(tag.tagName.toLowerCase()==type){
				fn();
			}
		},
		off:function(node,type){
			for(var i=0;i<node.lib[type].length;i++){
				node.removeEventListener(type,node.lib[type][i],false);
			}
			node.lib[type]=[];
		},
		firstChild:function(node){
			return node.children[0] ? node.children[0] : false;
		},
		lastChild:function(node){
			var ls=node.children.length-1;
			return node.children[ls] ? node.children[ls] : false;
		},
		next:function(node){
			return node.nextElementSibling ? node.nextElementSibling :node.nextSibling;
		},
		prev:function(node){
			return node.previousElementSibling ? node.previousElementSibling :node.previousSibling;
		},
		getOffsetToBody:function(node,type){
			var pr=0;
			var par=node;
			while(par){
				pr+=par['offset'+type];
				par=par.offsetParent;
			}
			return pr;
		}
	}
	window.q=q;
})(window)
