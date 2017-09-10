var vm=new Vue({
		el:"#app",
		data:{
			datas:[]
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
		methods:{
            getTitleHref:function(val){
                return '/examine.html?taskid='+val;
            } 
        },
		created:function(){
			var user=getCookie('userid')
			var type=localurl('flowtype')
			var _this=this;
			var start = 0;
			
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
					axios.get("/workflow/getAwaitMessage",{params:{userid:user,start:0,limit:10,flowtype:type}}).then(function(response){
						_this.datas=response.data;
						setTimeout(function(){
							me.resetload();
			                start=10;
			                me.unlock();
	                        me.noData(false);
			            },1000);
					}).catch(function(error){
					 	console.log(error);
						me.resetload();
					});
		        },
				loadDownFn : function(me){
					axios.get("/workflow/getAwaitMessage",{params:{userid:user,start:start,limit:10,flowtype:type}}).then(function(response){
						console.log(_this.datas.length)
						if(response.data.length<=10){
							_this.data=response.data
						}
						if(response.data.length>0){
							_this.datas=_this.datas.concat(response.data)
						}else{
							me.lock()
			                me.noData(true);
						}
						
						setTimeout(function(){
							start+=10;
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
