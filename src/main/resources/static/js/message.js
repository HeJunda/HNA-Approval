var vm=new Vue({
	el:"#app",
	data:{
		dataes:[]
	},
	created:function(){
		var _this=this;
		var user=getCookie('userid');
		var start = 0;
		$("body").dropload({
			scrollArea : window,
			domDown : {
				domClass : 'dropload-down',
				domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
				domLoad : '<div class="dropload-load">加载中...</div>',
				domNoData : '<div class="dropload-noData">暂无数据</div>'
			},
			loadDownFn : function(me){
				start=_this.dataes.length;
				
				axios.get("/message/getMessageList",{params:{userid:user,start:start,limit:10}}).then(function(response){
					if(response.data.length>0){
						console.log(response.data.length)
						_this.dataes=_this.dataes.concat(response.data)
					}else{
						console.log(response.data.length)
						me.lock('up')
			            me.lock('down')
			            me.noData(true);
					}
					setTimeout(function(){
		                me.resetload();
		            },1000);
					
				}).catch(function(error){
				 	console.log(error);
					me.resetload();
				});
			}
		}) 
	},
	methods:{
		add(index){
			layer.open({
			    title: [
			      '消息提醒',
			      'background-color: #FFC800; color:#fff;'
			    ],
			    content:this.dataes[index].content
			});
		}
	}
})