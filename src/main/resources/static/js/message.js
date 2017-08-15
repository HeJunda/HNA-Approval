var vm=new Vue({
	el:"#app",
	data:{
		data:[]
	},
	created:function(){
		var _this=this;
		var user=getCookie('userid');
		var start = 0;
		$("#message").dropload({
			scrollArea : window,
			loadDownFn : function(me){
				var result = [];
				if(_this.data.length>=10){
					start=_this.data.length;
				}
				axios.get("/message/getMessageList",{params:{userid:user,start:start,limit:10}}).then(function(response){
					if(response.data.length>0){
						_this.data=_this.data.concat(response.data)
					 	}else{
		                	me.lock();
		                   	me.noData();
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
			    content:this.data[index].content
			});
		}
	}
})