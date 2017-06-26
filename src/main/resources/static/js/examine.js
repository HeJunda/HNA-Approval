 new Vue({
	el:'#app',
	data:{
      showDom:false,
      showHistory:false,
      showLayer:false,
      showuser:false,
      digital:{},
      personObj:{},
      opinion:'',
      activeName:'',
      opinion:'',
      status:'',
      actionlist:[],
      dates:[],
      datis:[],
      comeback:'',
      parms:[],
      noname:[],
      personArr:[],
      moom:[]
	},
	filters:{
		quite:function(value){
			if(this.actionlist.name=="同意"){
				$(".status-icon").attr(":class","{active: activeName == 'submit'}")
			}else if(this.actionlist.name=="否决"){
				$(".status-icon").attr(":class","{active: activeName == 'overrule'}")
			}else if(this.actionlist.name=="打回"){
				$(".status-icon").attr(":class","{active: activeName == 'ballBack'}")
			}else if(this.actionlist.name=="分阅"){
				$(".status-icon").attr(":class","{active: activeName == 'report'}")
			}else if(this.actionlist.name=="协作"){
				$(".status-icon").attr(":class","{active: activeName == 'cooperation'}")
			}
		}
	},
	methods:{
		showDiv:function(event){
			var _this=this;
			axios.get("/workflow/getProcessInformation",{params:{userid:'6666',instanceid:"T1385"}}).then(function(response){
				var strs=[];
				strs.push(response.data);
				_this.dates=strs;
				console.log(_this.dates)
				//console.log(_this.datas.taskid);
				//alert(this.datas.constructor == Array);
			}).catch(function(error){
			    console.log(error);
			});
			
			this.showDom=!this.showDom;
				
			},
		showUser:function(parame){
			this.showuser=!this.showuser;
			var taskId=this.digital.taskid;
			var parames=parame.value;
			var paramename=parame.nodename;
			var parm=this.parms.type;
			var names=this.parms.value;
			var instance=this.digital.instanceid;
			var noname=this.noname;
			var _this=this
			axios.get('/workflow/selectPerson',{params:{userid:'6666',taskid:taskId,actionvalue:names,nodename:noname,actiontype:parm,instanceid:instance}}).then(function(response){
				var memo=response.data.memo;
				var useid=response.data.userid;
				console.log(response.data)
				console.log(useid)
				var personList=[];
				personList.push(response.data);
				_this.moom=personList;
				
				$(".content ul").on("click",$(".content li"),function(ev){
					var ev = ev || window.event;
					var target = ev.target || ev.srcElement;
					console.log($(target));
					if(target.nodeName.toLowerCase() == "li"){
						if ($(target).children().hasClass('bg')) {
							$(target).children('.bg').remove();
							$(target).removeAttr('data-id');
						}else{
							var lis=document.createElement('span')
							lis.setAttribute("class","bg");
							lis.innerHTML="√";
							if(target.nodeName.toLowerCase() == "li"){
								$(target).append(lis).attr('data-id',useid);
							}
						}
					}
				})
			},function(err){
				console.log(err)
			});
		},
		showok:function(){
			this.showuser=!this.showuser;
			var personLen=$(".content li").attr('data-id');
			this.personArr.push(personLen);
			//console.log(this.personArr);
			var personObj={};
			for(var i=0;i<this.personArr.length;i++){
				personObj[i+1]=this.personArr[i]
			}
			console.log(personObj)
		},
		showNode:function(){
			var _this=this;
			var instance=this.digital.instanceid;
			axios.get("/workflow/getHistoricalApproval",{params:{userid:'6666',instanceid:instance}}).then(function(response){
				var stris=[];
				stris.push(response.data);
				_this.datis=stris;
				
			}).catch(function(error){
			    console.log(error);
			});
			this.showHistory=!this.showHistory;
		},
		showTip:function(){
			this.showLayer=!this.showLayer;
		},
		hideDiv:function(){
			var _this=this;
			axios.get("/workflow/getAwaitDetail",{params:{userid:'6666',taskid:this.taskid}}).then(function(response){
				console.log(response.data)
				var zrr=[];
				zrr.push(response.data);
				_this.dais=zrr;
			}).catch(function(error){
			    console.log(error);
			});
			this.showLayer=!this.showLayer;
		},
		showIcon:function(name){
			this.showLayer=!this.showLayer;
            this.activeName = name.name;
            this.status=name.name;
            this.parms=name;
            var names=name.value;
            var taskId=this.digital.taskid;
            
            /*弹出框(一)*/
            if(name.comeback!='0' && name.comeback!=""){
            	var comeback=name.comeback;
            	var html='';
            	if(comeback==1){
            		html='<div class="comeback"><p><input type="radio" checked="true" name="Comeback" value="0">下一步按原流程重新提交逐级审批</p><p><input type="radio" name="Comeback" value="1">下一步直接提交至本节点</p><p><input type="radio" name="Comeback" value="2">由下一步处理人选择提交</p></div>';
            	}else if(comeback==2){
            		html='<div class=""><p><input type="radio" name="Comeback" value="0">下一步按原流程重新提交逐级审批</p><p><input type="radio" checked="true" name="Comeback" value="1">下一步直接提交至本节点</p><p><input type="radio" name="Comeback" value="2">由下一步处理人选择提交</p></div>';
            	}else if(comeback==3){
            		html=html='<div class=""><p><input type="radio" name="Comeback" value="0">下一步按原流程重新提交逐级审批</p><p><input type="radio" name="Comeback" value="1">下一步直接提交至本节点</p><p><input type="radio" checked="true" name="Comeback" value="2">由下一步处理人选择提交</p></div>';
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
            	      }
            	  });   	
            }else{
            	this.comeback=name.comeback;
            } 
            /*人物弹出框(二)*/
            if(name.type==2||name.type==3||name.type==4||name.type==7||name.type==9){
            	document.querySelector(".person-item").style.display="block";
            	if(name.type==2){
                	axios.get("/workflow/getNextNode",{params:{userid:'6666',actionvalue:names,taskid:taskId}}).then(function(response){
                		this.noname=response.data.nodename
                	},function(err){
                		console.log(err)
                	})
            	}else{this.noname=""}
            	
            }else{document.querySelector(".person-item").style.display="none";}          
		},
		submit:function(){
			if(this.opinion=="" || this.activeName==""){
				layer.open({
				    content: '输入不能为空',
				    skin: 'msg',
				    style: 'background-color:#ccc; color:#fff; border:none;',
				    time: 3 
				  });
			}
			var _this=this;
			var str=this.opinion;
			var parm=this.parms;
			var comebacks=this.comeback;
			var formtypes=this.digital.formtype;
			var taskId=this.digital.taskid;
			var persones=this.personArr;			
			axios.post("/workflow/processProcessing",{userid:'6666',taskeid:taskId,nextopermap:persones,actionname:parm.name,remark:str,actiontype:parm.type,actionvalue:parm.value,comeback:comebacks,formtype:formtypes,receiveuserids:''}).then(function(response){
				if(response.data.code==1){
					window.location.href='agency.html';
				}else{
					layer.open({
					    content: response.data.result,
					    style: 'background-color:#ccc; color:#fff; border:none;',
					    skin: 'msg',
					    time: 3 
					  });
				}
			}).catch(function(reseponse){
				console.log(reseponse)
				layer.open({
				    content: response.result,
				    style: 'background-color:#ccc; color:#fff; border:none;',
				    skin: 'msg',
				    time: 3 
				  });
			})
			
		}
		
	},
	created:function(){
		var _this=this;
		axios.get("/workflow/getAwaitDetail",{params:{userid:'6666',taskid:1784577}}).then(function(response){
			_this.digital=response.data;
			_this.actionlist=JSON.parse(response.data.actionlist);
		}).catch(function(error){
		    console.log(error);
		});		
	}
});