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
						console.log(response.data.length)
						_this.dataes=_this.dataes.concat(response.data)
				 	}else{
				 		console.log(123)
				 		me.lock('up');
		                me.lock('down')
		                me.noData(true);
		                $('.dropload-down').remove();
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