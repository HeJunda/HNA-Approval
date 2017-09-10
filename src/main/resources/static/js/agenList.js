new Vue({
	el:"#wrap",
	data:{
		dataes:[],
		agenshow:false
	},
	filters:{
		showIcon:function(type){
			if(type=="10000"){
				return 'images/one.png';
			}else if(type=="10003"){
				return 'images/two.png';
			}else if(type=="11932"){
				return 'images/three.png';
			}else if(type=="10001"){
				return 'images/four.png';
			}else if(type=="11781"){
				return 'images/five.png';
			}else if(type=="33812"){
				return 'images/siex.png';
			}else if(type=="23178"){
				return 'images/siex.png';
			}
		}
	},
	mounted:function(){
		var user=getCookie('userid')
		var _this=this;
		
		$("body").dropload({
			scrollArea : window,
			domUp : {
	            domClass   : 'dropload-up',
	            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
	            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
	            domLoad    : '<div class="dropload-load">加载中...</div>'
	        },
			domDown : {
				domClass : 'dropload-down',
				domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
				domLoad : '<div class="dropload-load">加载中...</div>',
				domNoData : '<div class="dropload-noData">数据加载完毕</div>'
			},
			loadUpFn : function(me){
				var conH=$('.clearfix').height()//每个li的高度
				var clien=document.documentElement.clientHeight//当前屏幕的高度
				axios.get("/workflow/getAwaitSortList",{params:{userid:user}}).then(function(response){
					console.log(response.data.length)
					_this.dataes=response.data;
					_this.agenshow=true
					var H=conH*response.data.length;
					
					setTimeout(function(){
						me.resetload();
		                me.unlock();
                        me.noData(false);
		            },1000);
				}).catch(function(error){
				 	console.log(error);
					me.resetload();
				});
	        },
			loadDownFn : function(me){
				axios.get("/workflow/getAwaitSortList",{params:{userid:user}}).then(function(response){
					console.log(response.data)
					if(response.data.length>0){
						_this.dataes=response.data;
					}
					me.lock('down')
	                me.noData(true);
					_this.agenshow=true
					setTimeout(function(){
	                    me.resetload();
	                },1000);
				}).catch(function(error){
				 	console.log(error);
					me.resetload();
				});
			}
		})
	}
})
