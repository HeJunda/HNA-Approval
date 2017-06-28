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
			var _this=this;
			document.cookie = 'userid'+'='+6666;
			console.log(document.cookie)
			
			var user=getCookie('userid')
			console.log(user)
			
			axios.get("/workflow/getAwaitMessage",{params:{userid:user}}).then(function(response){
				_this.datas=response.data;
				console.log(_this.datas)
			}).catch(function(error){
			    console.log(error);
		});
	}
})