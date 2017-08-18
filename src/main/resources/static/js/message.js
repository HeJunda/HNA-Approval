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
			loadDownFn : function(me){
				var result = [];
					start=_this.dataes.length;
				axios.get("/message/getMessageList",{params:{userid:user,start:start,limit:10}}).then(function(response){
					if(response.data.length>0){
						_this.dataes=_this.dataes.concat(response.data)
				 	}else{
				 		me.lock('up');
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