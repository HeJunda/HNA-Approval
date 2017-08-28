/*var follow=new Vue({
	el:'#app',
	data:{
		dataes:[],
		activeClass:1,
		userid:''
	},		
	methods:{
		person:function(value){
			this.activeClass=value;
			 var user=getCookie('userid');
			axios.get("/workflow/getSplitRead",{params:{userid:this.userid,start:0,limit:10}}).then(function(response){
		  		  //this.dataes=response.data
				follow.dataes.push.apply(follow.dataes,res.data);
		  	  }).catch(function(error){
		  		  console.log(error);
		  	  });
		},
		approval:function(value){
			this.activeClass=value;
			console.log("222222");
			 var user=getCookie('userid');
			axios.get("/workflow/getSplitRead",{params:{userid:this.userid,start:0,limit:10}}).then(function(response){
				follow.dataes.push.apply(follow.dataes,res.data);
		  	  }).catch(function(error){
		  		  console.log(error);
		  	  });
		}
	},
	created:function(){
  	  var _this=this;
  	  var user=getCookie('userid');
	  this.userid=user;
  	  axios.get("/workflow/getSplitRead",{params:{userid:user,start:0,limit:10}}).then(function(response){
  		  _this.dataes=response.data
  		  console.log(_this.dataes)
  	  }).catch(function(error){
  		  console.log(error);
  	  });
  }
})
  var myScroller=new IScroll("#List",{
	mouseWheel: true,  
    scrollbars: true  
  });
  myScroller.on('scrollEnd', function(){
	var len=follow.dataes.length;
	console.log(len)
	var user=getCookie('userid')
	axios.get("/workflow/getSplitRead",{params:{userid:user,start:len,limit:10}}).then(function(res){
		if(res.data.length!=0)
		//vm.datas.concat(res.data);	
		follow.dataes.push.apply(follow.dataes,res.data)
		console.log("____"+JSON.stringify(res.data))
		}).catch(function(error){
	    console.log(error);
	});
  });    */
$(function(){
	var userid = getCookie("userid");
	
	var itemIndex = 0;
	
	$('.tab .item').on('click',function(){
		
		var $this = $(this);
	    itemIndex = $this.index();
	    $this.addClass('cur').siblings('.item').removeClass('cur');
	    $('.agency-list').eq(itemIndex).show().siblings('.agency-list').hide();
	    $('.agency-list').html('')
	    if(itemIndex == '0'){
		    $.ajax({
		        type: 'GET',
		        url: '/workflow/getSplitRead',
		        data:{
		        	userid:userid,
		        	start:0,
		        	limit:10000,
		        	hasread:0
		        },
		        dataType: 'json',
		        success: function(data){
		        	if(data==""){
		        		var result=''
			                for(var i = 0; i < data.length; i++){
			                    result +=   '<li class="clearfix">'
								      		+'<a href="/followAwait.html?taskid='+data[i].taskid+'">'
								      			+'<div class="followList">'
								            		+'<div class="right-box">'
								           				+'<p class="follow-person">发送人：<span class="fr follr">'+data[i].sendername+'</span></p>'
								           				+'<p class="follow-person">创建时间：<span class="fr follr">'+data[i].createtime+'</span></p>'
								           				+'<p class="follow-person">流程发起部门：<span class="fr follr">'+data[i].startorg+'</span></p>'
								           				+'<p class="follow-person">流程发起人：<span class="fr follr">'+data[i].startname+'</span></p>'
								           			+'</div>'
								           		+'</div>'
								           	+'</a>'	
								      	+'</li>'
		                }
		                	$('.agency-list').append(result);
		        	}else{
		        		$('.conSearch').text()
		        		$('.agency-list').append('<div class="conText">暂无数据</div>')
		        	}
		        	
			            
	        		},
	        		error: function(err){
	        		    console.log(err);
	        		}
				})
	// 加载菜单二的数据
		}else if(itemIndex == '1'){
			console.log(itemIndex)
		    $.ajax({
		        type: 'GET',
		        url: '/workflow/getSplitRead',
		        data:{
		        	userid:userid,
		        	start:0,
		        	limit:10000,
		        	hasread:1
		        },
		        dataType: 'json',
		        success: function(data){
		        	if(data==""){
		        		var result = '';
			            for(var i = 0; i < data.length; i++){
			            	console.log(data)
			                result +=   '<li class="clearfix">'
						                	+'<a href="/followAlready.html?instanceid='+data[i].instanceid+'">'
								      			+'<div class="followList">'
								            		+'<div class="right-box">'
								           				+'<p class="follow-person">发送人：<span class="fr follr">'+data[i].sendername+'</span></p>'
								           				+'<p class="follow-person">创建时间：<span class="fr follr">'+data[i].createtime+'</span></p>'
								           				+'<p class="follow-person">流程发起部门：<span class="fr follr">'+data[i].startorg+'</span></p>'
								           				+'<p class="follow-person">流程发起人：<span class="fr follr">'+data[i].startname+'</span></p>'
								           				+'<p class="follow-person">知会处理人：<span class="fr follr">'+data[i].recivertime+'</span></p>'
								           				+'<p class="follow-person">知会意见：<span class="fr follr">'+data[i].noticemsg+'</span></p>'
								           			+'</div>'
								           		+'</div>'
								           	+'</a>'
										+'</li>'
			            }
			            $('.agency-list').append(result);
		        	}else{
		        		$('.conSearch').text()
		        		$('.agency-list').append('<div class="conText">暂无数据</div>')
		        	}
		            
		        },
		        error: function(err){
		            console.log(err);
		        }
		    })
		}
	})
	$('.tab .item').eq(0).click()
	
})






