 new Vue({
	el:'#app',
	data:{
      showDom:false,
      showHistory:false,
      showLayer:false,
      opinion:'',
      activeName:'',
      status:''
	},
	methods:{
		showDiv:function(event){
			this.showDom=!this.showDom;
		},
		showNode:function(){
			this.showHistory=!this.showHistory;
		},
		showTip:function(){
			this.showLayer=!this.showLayer;
		},
		hideDiv:function(){
			this.showLayer=!this.showLayer;
		},
		showIcon:function(name){
            this.activeName = name;
            this.showLayer=!this.showLayer;
            if(name=="report"){
            	this.status='继续呈报';
            }else if(name=="ballBack"){
            	this.status='打回';
            }else if(name=="submit"){
            	this.status='同意';
            }else if(name=="cooperation"){
            	this.status='协作';
            }else if(name=="overrule"){
            	this.status='否决';
            }else if(name=="finish"){
            	this.status='结束';
            }else{this.status=''}
		}
	}/*,
      created(){
            this.$http.get("").then(function(res){
                  console.log("success")
            },function(res){
                  console.log("wail.....")
            })
      }*/
});