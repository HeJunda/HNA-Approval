new Vue({
	el:"#app",
	data:{
		dataes:[],
		agenshow:false
	},
	filters:{
		showIcon:function(type){
			if(type=="10000"){
				return 'approve-icon';
			}else if(type=="10003"){
				return 'project-icon';
			}else if(type=="11932"){
				return 'other-icon';
			}else if(type=="10001"){
				return 'fund-icon';
			}else if(type=="11781"){
				return 'info-icon';
			}else if(type=="33812"){
				return 'xucp-icon';
			}else if(type=="23178"){
				return 'other-icon';
			}
		}
	},
	created:function(){
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
				domNoData : '<div class="dropload-noData">暂无数据</div>'
			},
			loadUpFn : function(me){
				axios.get("/workflow/getAwaitSortList",{params:{userid:user}}).then(function(response){
					_this.dataes=response.data;
					_this.agenshow=true
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
