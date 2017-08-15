var vm=new Vue({
		el:"#app",
		data:{
			datas:[]
		},
		methods:{
            getTitleHref:function(val){
                return '/examine.html?taskid='+val;
            } 
        },
		created:function(){
			
			var user=getCookie('userid')
			var _this=this;
			var start = 0;
			
			$("#clearList").dropload({
				scrollArea : window,
				loadDownFn : function(me){
					start=_this.datas.length;
					axios.get("/workflow/getAwaitMessage",{params:{userid:user,start:start,limit:10}}).then(function(response){
						if(response.data.length>0){
							_this.datas=_this.datas.concat(response.data)
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
		}
})
