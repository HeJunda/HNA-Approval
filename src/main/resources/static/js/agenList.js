new Vue({
	el:"#app",
	data:{
		dataes:[]
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
		//this.activeName = name.name;
		var _this=this;
		axios.get("/workflow/getAwaitSortList",{params:{userid:user}}).then(function(response){
			if(response.data!=''){
				_this.dataes=response.data
				console.log(_this.dataes)
			}else{
				$('#app').append('<div class="conText">暂无数据</div>')
			}
			
		}).catch(function(error){
		 	console.log(error);
		});
	}
})
