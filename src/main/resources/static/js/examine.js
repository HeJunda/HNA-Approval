var changlang = false;
var moreInfo = false;
var moreHis = false;
var lodeDown = false;
var vm=new Vue({
	el:'#app',
	data:{
      showDom:false,
      showLayer:false,
      showuser:false,
      showLange:false,
      showHis:true,
      showAtt:false,
      digital:{},
      ObjInfo:{},
      temes:[],
      annex:[],
      attach:'',
      histry:[],
      aclist:'',
      list:'',
      person:'',   	  
      opinion:'',
      activeName:'',
      status:'',
      actionlist:[],  
      comeback:'',
      dates:[],
      parms:[],
      noname:'',
      personStr:'',
      personUser:'',
      moom:[],
      add:'',
      html:'',
      language:[],
      exaMore:true,
      exbMore:true,
      loading:true

	},
	/*过滤ICON图标*/
	filters:{
		showTubiao:function(value){
			if(value=="同意"){
				return 'submit';
			}else if(value=="否决"){
				return 'overrule';
			}else if(value=="打回"){
				return 'ballBack';
			}else if(value=="分阅"){
				return 'branch';
			}else if(value=="协作"){
				return 'cooperation';
			}else if(value=="提交"){
				return 'refer'
			}else if(value=="办理"){
				return 'handle'
			}else if(value=="继续呈报"){
				return 'report'
			}else if(value=="结束"){
				return 'finish'
			}else if(value=="开户"){
				return 'blossom'
			}else{
				return 'other'
			}
		}
	},
	created:function(){
		$('.dropload-down').css('display','none')
		var taskId=localurl('taskid')
		var user=getCookie('userid')
		var _this=this;
		var dropload = $("body").dropload({
			scrollArea : window,
			domUp : {
	            domClass   : 'dropload-up',
	            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
	            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
	            domLoad    : '<div class="dropload-load">加载中...</div>'
	        },
			loadUpFn : function(me){
			
				changlang = false;
				moreInfo = false;
				moreHis = false;
				axios.get("/workflow/getCommonlanguage",{params:{userid:user}}).then(function(response){
					_this.html=""
	    			$.each(response.data,function(i,val){
	    				_this.html+='<div class="option" value="'+response.data[i].phrase+'">'+response.data[i].phrase+'</div>'	
	    			});
	    			
	    			axios.get("/workflow/getAwaitDetail",{params:{userid:user,taskid:taskId}}).then(function(response){
						_this.digital=response.data[0];
						_this.add=response.data[0].instanceid;
						var instance=_this.add;
						var user=getCookie('userid');
						axios.get("/workflow/getHistoricalApproval",{params:{userid:user,start:0,limit:10000,instanceid:instance}}).then(function(response){
							_this.histry=response.data
							moreInfo = true;
							moreHis=true;
							changlang = true;
							var arr=[];
                            for(var i=0;i<response.data.length;i++){
                                var strs1 = response.data[i].attach.replace(/\{/g,'').replace(/\}/g,'').replace(/\"/g,'');
                                var arrs1 = strs1.split(',');
                                var arrs2 = [];
                                for(var ii = 0;ii<arrs1.length;ii++){
                                    arrs2.push(arrs1[ii].split(':'))
                                }
                                arr.push(arrs2);
                            }
							_this.annex=arr;
			        	},function(err){
			        		console.log(err)
			        	})
                        console.log("/workflow/getAwaitDetail")
			        	_this.loading=false
						setTimeout(function(){
							me.resetload();
			                me.unlock();
	                        me.noData(false);
			            },1000);
					}).catch(function(error){
					    console.log(error);
					    me.resetload();
					});
				}).catch(function(error){
				    console.log(error);
				    me.resetload();
				});		
				}
		});
		dropload.lock('up');
		dropload.noData();
		dropload.resetload();
		axios.get("/workflow/getCommonlanguage",{params:{userid:user}}).then(function(response){
			
			$.each(response.data,function(i,val){
				_this.html+='<div class="option" value="'+response.data[i].phrase+'">'+response.data[i].phrase+'</div>'
			});
			
			axios.get("/workflow/getAwaitDetail",{params:{userid:user,taskid:taskId}}).then(function(response){
				_this.digital=response.data[0];
				_this.add=response.data[0].instanceid;
				var instance=_this.add;
				var user=getCookie('userid');
				_this.aclist=response.data;
				if(response.data==[]){
					setTimeout(function(){
						_this.showLayer=false;
					},1000)
					setTimeout(function(){
						layer.open({
							content: '数据获取失败,请重新尝试。'
							,skin: 'msg'
							,time: 3 //2秒后自动关闭
						 })
					},2000)
				}
				_this.list=JSON.parse(_this.aclist[0].actionlist)
				axios.get("/workflow/getHistoricalApproval",{params:{userid:user,start:0,limit:10000,instanceid:instance}}).then(function(response){
					_this.histry=response.data
					var arr=[];
					for(var i=0;i<response.data.length;i++){
						var strs1 = response.data[i].attach.replace(/\{/g,'').replace(/\}/g,'').replace(/\"/g,'');
						var arrs1 = strs1.split(',');
						var arrs2 = [];
						for(var ii = 0;ii<arrs1.length;ii++){
							arrs2.push(arrs1[ii].split(':'))
						}
						arr.push(arrs2);
					}
					_this.annex=arr;

					axios.get("/workflow/getProcessInformation",{params:{userid:user,instanceid:instance}}).then(function(response){
						console.log(response+"-------------");
						_this.dates=response.data[0];
						_this.loading=false;
						moreInfo = true;
						moreHis = true;
						changlang = true;
						var info=_this.dates.flowinfo;
						
						//var bsicInfo=JSON.stringify(JSON.parse(info['0|基本信息']))
						_this.ObjInfo=JSON.parse(info);
						var more=response.data[0].formtype;
						console.log(more)
						if(more==23){
							_this.exaMore=false;
							_this.exbMore=true;
						}else{
							_this.exaMore=true;
							_this.exbMore=false
						}
						//_this.dates=response.data[0];
						if(more==23){
							console.log($(".examine-details li:last-child span"))
							$(".examine-details li:last-child span").removeClass("")
						}


						/*dropload.unlock('up');
						dropload.noData();
						dropload.resetload();*/
					})
	        	})
			})
		})
	},
	methods:{
		/*点击更多详情*/
		showDiv:function(event){
			if(moreInfo){
				this.showDom=!this.showDom;
			}
		},
		showNode:function(){
			if(moreHis){
				this.showHis=!this.showHis 
			}
		},
		showTip:function(){
			this.showLayer=!this.showLayer;
			// var _this=this;
			// var taskId=_this.digital.taskid;
			// var user=getCookie('userid')
			// axios.get("/workflow/getAwaitDetail",{params:{userid:user,taskid:taskId}}).then(function(response){
			// 	_this.aclist=response.data;
			// 	if(response.data==[]){
			// 		setTimeout(function(){
			// 			_this.showLayer=false;
			// 		},1000)
			// 		setTimeout(function(){
			// 			layer.open({
			// 			    content: '数据获取失败,请重新尝试。'
			// 			    ,skin: 'msg'
			// 			    ,time: 3 //2秒后自动关闭
			// 			 })
			// 		},2000)
            //
            //
			// 	}
			// 	_this.list=JSON.parse(_this.aclist[0].actionlist)
			// }).catch(function(error){
			//     console.log(error);
			// });
		},
		hideDiv:function(){
			this.showLayer=!this.showLayer;
		},
		/*处理*/
		showIcon:function(name){
			var _this=this;
			this.showLayer=!this.showLayer;
	        this.activeName = name.name;
	        this.status=name.name;
	        this.parms=name;
	        var names=name.value;
	        var taskId=this.digital.taskid;
	        /*弹出框(一)*/
	        if(name.comeback!='0' && name.comeback!=""){
	        	this.comeback=name.comeback;
	        	var html='';
	        	if(this.comeback==1){
	        		html='<div class="comeback"><p><input type="radio" checked="true" name="Comeback" value="0">下一步按原流程重新提交逐级审批</p><p><input type="radio" name="Comeback" value="1">下一步直接提交至本节点</p><p><input type="radio" name="Comeback" value="2">由下一步处理人选择提交</p></div>';
	        	}else if(this.comeback==2){
	        		html='<div class=""><p><input type="radio" name="Comeback" value="0">下一步按原流程重新提交逐级审批</p><p><input type="radio" checked="true" name="Comeback" value="1">下一步直接提交至本节点</p><p><input type="radio" name="Comeback" value="2">由下一步处理人选择提交</p></div>';
	        	}else if(this.comeback==3){
	        		html='<div class=""><p><input type="radio" name="Comeback" value="0">下一步按原流程重新提交逐级审批</p><p><input type="radio" name="Comeback" value="1">下一步直接提交至本节点</p><p><input type="radio" checked="true" name="Comeback" value="2">由下一步处理人选择提交</p></div>';
	        	}
	        	var index=layer.open({
	        	    content: html,
	        	    btn: ['确定','取消'],
	        	    yes: function(index){
	        	    	 var check=document.querySelectorAll("input[name='Comeback']");
	        	    	 
	        	    	 for(var i=0;i<check.length;i++){
	        	    		 if(check[i].checked){
	            	    		 this.comeback=check[i].value;
	            	    	 }	
	        	    	 }
	        	    	 layer.close(index);
	        	    },
	        	    no: function(){
	        	    	_this.status="";
	        	    	_this.parms="";
	        	    	actionname:"";
	        	    }
	        	  });   	
	        }else{
	        	this.comeback=name.comeback;
	        }
	        /*人物弹出框(二)*/
	        if(name.type==2||name.type==3||name.type==4||name.type==7||name.type==9){
	        	document.querySelector(".person-item").style.display="block";
	        
	        	var _this=this;
	        	if(name.type==2){
	        		var user=getCookie('userid')
	        		axios.get("/workflow/getNextNode",{params:{userid:user,actionvalue:names,taskid:taskId}}).then(function(response){
	        			
	            		_this.noname=response.data.nodename
	            	
	            	},function(err){
	            		console.log(err)
	            	})
	        	}else{
	            	_this.noname=""
	        	}
	        }else{
	        	document.querySelector(".person-item").style.display="none";
	        } 
		},
		/*点击选人*/
		showUser:function(parame){
			$("content li").removeClass('bg');
			$(".content ul").off("click",'li');
			this.personStr=[]
			this.showuser=!this.showuser;
			var taskId=this.digital.taskid;
			var parm=this.parms.type;
			var names=this.parms.value;
			var instance=this.digital.instanceid;
			var noname=this.noname;
			
			var _this=this
			var user=getCookie('userid')
			axios.get('/workflow/selectPerson',{params:{userid:user,start:0,taskid:taskId,actionvalue:names,nodename:noname,actiontype:parm,instanceid:instance}}).then(function(response){
				_this.person=response.data;
				var personList=[];
				var personName=[];
				_this.person.forEach(function(i,index,array){
					var arrUser=i.userid;
					var arrName=i.username;
					personList.push(arrUser);
					personName.push(arrName);
				})
				
				$(".content ul").on("click",'li',function(){
					
					var ind=$(this).index()
					if($(this).hasClass('bg')){
						$(this).removeClass('bg')
						$(this).removeAttr('data-id')
					}else{
						$(this).addClass('bg')
						$(this).attr('data-id',personList[ind])
					}
				})
				
			},function(err){
				console.log(err)
			});
		},
		/*点击确定*/
		showok:function(){
			this.showuser=!this.showuser;
			this.personUser='';
			var _this=this;
			
			var lis=$(".content li");
			var personArr=[];
			var personName=[];
			for(var i=0;i<lis.length;i++){
				if(lis.eq(i).hasClass('bg')){
					personName.push(lis.eq(i).text());
				}
				if(lis.eq(i).attr('data-id')!=undefined){
					personArr.push(lis.eq(i).attr('data-id'));
				}
			}
			_this.personStr=personName
			_this.personUser=personArr.join(',')
			if($(".bg").length=="0"){
				layer.open({
				    content: '请添加选择人',
				    skin: 'msg',
				    style: 'background-color:#ccc; color:#fff; border:none;',
				    time: 1
				});
			}
			//lis.removeClass('bg')
		},
			
		/*常用语*/
		lane:function(){
			var _this=this;
			
			if(changlang){
				var L=layer.open({
				    title: [
				            '常用语',
				            'background-color: #E75732; color:#fff;'
				          ]
				          ,content: _this.html
				        });
				
				$(document).on("click",".option",function(){
					var value=$(this).text()
					$("#sele").val(value)
					_this.opinion=$("#sele").val();
					layer.close(L)
				}); 
			}
			
		},
		/*点击提交*/
		submit:function(){
			if(this.status==""){
				layer.open({
				    content: '处理方式不能为空',
				    skin: 'msg',
				    style: 'background-color:#ccc; color:#fff; border:none;',
				    time: 2
				});
			}else{
				var _this=this;
				var str=$("#sele").val();
				var parm=this.parms;
				var comebacks=this.comeback;
				var formtypes=this.digital.formtype;
				var taskId=this.digital.taskid;
				var personStrs=this.personUser;
				var nonames=this.noname;
				var user=getCookie('userid')
				axios.post("/workflow/processProcessing",{userid:user,taskid:taskId,remark:str,nextopermap:nonames,actionname:parm.name,actiontype:parm.type,actionvalue:parm.value,comeback:comebacks,formtype:formtypes,receiveuserids:personStrs}).then(function(response){
				
					if(response.data[0].code=='1'){
						layer.open({
						    content: '提交成功',
						    skin: 'msg',
						    style: 'background-color:#ccc; color:#fff; border:none;',
						    time: 2
						  });
						setTimeout(function(){window.location.href='agenList.html'},1000)
						var count=parseInt(sessionStorage.getItem('count')-1);
						sessionStorage.setItem('count',count)
						
					}else{
						layer.open({
						    content: response.data[0].result,
						    style: 'background-color:#ccc; color:#fff; border:none;',
						    skin: 'msg',
						    time: 2
						});
					}
				}).catch(function(response){
					console.log(response)
					layer.open({
					    content: response.result,
					    style: 'background-color:#ccc; color:#fff; border:none;',
					    skin: 'msg',
					    time: 2
					});
				})
			}
		}
	}
})
