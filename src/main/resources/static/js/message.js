var vm=new Vue({
	el:"#app",
	data:{
		dataes:[],
		meShow:false
	},
	created:function(){
		var _this=this;
		var user=getCookie('userid');
		var start = 0;
		var isLoad = true;
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
				domNoData : '<div class="dropload-noData">暂无更多数据</div>'
			},
			loadUpFn : function(me){
				axios.get("/message/getMessageList",{params:{userid:user,start:0,limit:10}}).then(function(response){
					
					_this.dataes=response.data;
					setTimeout(function(){
						me.resetload();
		                start=10;
		                isLoad=true;
		                me.unlock();
                        me.noData(false);
		            },1000);
					
				}).catch(function(error){
				 	console.log(error);
					me.resetload();
				});
	        },
			loadDownFn : function(me){
				if(isLoad){
					axios.get("/message/getMessageList",{params:{userid:user,start:start,limit:10}}).then(function(response){
						if(response.data.length>0&&response.data.length==10){
							//alert(111111111111+response.data.length)
							_this.dataes=_this.dataes.concat(response.data)
							start+=10;
						}else{
							//alert("没有："+response.data.length)
							isLoad = false;
							_this.dataes=_this.dataes.concat(response.data)
							me.lock()
			                me.noData(true);
						}
						 
						setTimeout(function(){
			                me.resetload();
			            },1000);
						_this.meShow=true;
					}).catch(function(error){
					 	console.log(error);
						me.resetload();
					});
				}
			}
		}) 
	},
	methods:{
		add(index){
			layer.open({
			    title: [
			      '消息提醒',
			      'background-color: #E75732; color:#fff;'
			    ],
			    content:this.dataes[index].content
			});
		}
	}
})