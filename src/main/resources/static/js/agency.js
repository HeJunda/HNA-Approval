var vm=new Vue({
		el:"#app",
		data:{
			datas:[]
		},
		filters:{
			
		},
		methods:{
            getTitleHref:function(val){
                return '/examine.html?'+val
            }
        },
		created:function(){
			var _this=this;
			axios.get("/workflow/getAwaitMessage",{params:{userid:'6666'}}).then(function(response){
				//console.log(JSON.stringify(response.data));
				//var da=[{"processname":"额外额外","tasktype":"O","starttime":"2014-09-24 18:33:47","starter":"特瑞","taskid":"1784577","nodename":"fdsds","iscandelegate":"1","flowname":"吃得过多","null":"","instanceid":"T1385"},{"processname":"额外额外","tasktype":"O","starttime":"2014-09-24 18:33:47","starter":"特瑞","taskid":"1784577","nodename":"大法师地方","iscandelegate":"1","flowname":"吃得过多","null":"","instanceid":"T1385"},{"processname":"sdsad","tasktype":"O","starttime":"2014-09-24 18:33:47","starter":"特瑞","taskid":"1784577","nodename":"大法师地方","iscandelegate":"1","flowname":"吃得过多","null":"","instanceid":"T1385"}];
				var str=[];
				str.push(response.data);
				_this.datas=str;
				console.log(_this.datas)
				//console.log(_this.datas.taskid);
				//alert(this.datas.constructor == Array);
			}).catch(function(error){
			    console.log(error);
		});
	}
})