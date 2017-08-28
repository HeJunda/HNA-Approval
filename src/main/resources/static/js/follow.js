
$(function(){
	var userid = getCookie("userid");
	
	var itemIndex = 0;
	
	$('.tab .item').on('click',function(){
		$('.followInfo').css('display','block')
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
		        	if(data!=""){
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
		                $('.followInfo').css('display','none')
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
			$('.followInfo').css('display','block')
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
		        	if(data!=""){
		        		var result = '';
			            for(var i = 0; i < data.length; i++){
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
		        	$('.followInfo').css('display','none')
		        },
		        error: function(err){
		            console.log(err);
		        }
		    })
		}
	})
	$('.tab .item').eq(0).click()
	
})






