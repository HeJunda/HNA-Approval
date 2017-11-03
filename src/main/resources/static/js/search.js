    var itemIndex = sessionStorage.getItem('flag')
    var searchs = false;
    var flowName = '';
    var startLi = 0;
    $('.searNav').eq(itemIndex).addClass('cur')
    var userid = getCookie("userid");
    $('.tab .item').on('click',function(){
        if(searchs){
            sessionStorage.setItem('flag',$(this).index());
            itemIndex = sessionStorage.getItem('flag');
            flowName = "";
            $('.agency-list').find('ul').html('');
            $('#gulpwork').val(''); // 清空输入框
            $(this).addClass('cur').siblings().removeClass('cur');
            startLi = 0;
            dropload.unlock(); // 解锁位置
            dropload.noData(false);
            dropload.resetload();
        }
    });
    //实现搜索
    function sear(){ //点击
        if(searchs){
            flowName = $('#gulpwork').val();
            $('.agency-list').find('ul').html('');
            itemIndex = sessionStorage.getItem('flag');
            startLi = 0;
            dropload.unlock(); // 解锁位置
            dropload.noData(false);
            dropload.resetload();
        }
    }
    var dropload=$('.js-search-list').dropload({
        scrollArea : window,
        distance: 50,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load">加载中...</div>'
        },
        domDown : {
            domClass : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
            domLoad : '<div class="dropload-load">加载中...</div>',
            domNoData : '<div class="dropload-noData">暂无更多数据</div>'
        },
        loadUpFn : function(me){
            searchs = false; // 不能点击列表
            var urls = itemIndex == 0?'/workflow/getMyInitiatedProcess/':'/workflow/getDoneMessage/';
            $.ajax({
                type: 'GET',
                url: urls,
                data:{
                    start:0,
                    limit:10,
                    userid:userid,
                    flowname: flowName
                },
                dataType: 'json',
                success: function(data){
                    var ahtml = "";
                    if(data.length>0){
                        for(var i=0;i<data.length;i++){
                            var isShowLi = '';
                            var startname = itemIndex == 0 ? data[i].startername : data[i].starter;
                            var startorg = itemIndex == 0 ? data[i].starterorgname : data[i].startorg;
                            if(startorg != undefined){
                                isShowLi = '<p class="follow-person">发起人部门：<span class="fr">'+startorg+'</span></p>';
                            }
                            ahtml+= '<li class="clearfix">'
                                +'<a href="/searchDetail.html?instance='+data[i].instanceid+'">'
                                +'<div class="agency-right">'
                                +'<div class="right-box">'
                                +'<h3 class="agenText">'+data[i].flowname+'</h3>'
                                +'<p class="follow-person">流程编号：<span class="fr">'+data[i].instanceid+'</span></p>'
                                +'<p class="follow-person">发起人：<span class="fr">'+startname+'</span></p>'
                                +'<p class="follow-person">发起时间：<span class="fr">'+data[i].starttime+'</span></p>'
                                +'<p class="follow-person">当前审批人：<span class="fr" style="width:65%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right">'+data[i].assigneename+'</span></p>'
                                + isShowLi
                                +'<span class="prompt fr">'+data[i].flowstatus+'</span>'
                                +'</div>'
                                +'</div>'
                                +'</a>'
                                +'</li>'
                                +'<p class="space"></p>'
                        }
                        $('.agency-list').find('ul').html(ahtml||'');
                    }
                    searchs=true; // 可以点击列表
                    if(data.length<10){
                        me.noData(true);
                    }else{
                        me.resetload();// 每次数据加载完，必须重置
                        me.unlock(); // 解锁位置
                        me.noData(false);
                    }
                    me.resetload(); // 每次数据加载完，必须重置
                }

            });
            startLi = 10; // up 后 startLi从10开始
        },
        loadDownFn : function(me){
            searchs = false; // 不能点击列表
            var urls = itemIndex == 0?'/workflow/getMyInitiatedProcess/':'/workflow/getDoneMessage/';
            $.ajax({
                type: 'GET',
                url: urls,
                data:{
                    start:startLi,
                    limit:10,
                    userid:userid,
                    flowname: flowName
                },
                dataType: 'json',
                success: function(data){
                    var ahtml = "";
                    if(data.length>0){
                        for(var i=0;i<data.length;i++){
                            var isShowLi = '';
                            var startname = itemIndex == 0 ? data[i].startername : data[i].starter;
                            var startorg = itemIndex == 0 ? data[i].starterorgname : data[i].startorg;
                            if(startorg != undefined){
                                isShowLi = '<p class="follow-person">发起人部门：<span class="fr">'+startorg+'</span></p>';
                            }
                            ahtml+= '<li class="clearfix">'
                                +'<a href="/searchDetail.html?instance='+data[i].instanceid+'">'
                                +'<div class="agency-right">'
                                +'<div class="right-box">'
                                +'<h3 class="agenText">'+data[i].flowname+'</h3>'
                                +'<p class="follow-person">流程编号：<span class="fr">'+data[i].instanceid+'</span></p>'
                                +'<p class="follow-person">发起人：<span class="fr">'+startname+'</span></p>'
                                +'<p class="follow-person">发起时间：<span class="fr">'+data[i].starttime+'</span></p>'
                                +'<p class="follow-person">当前审批人：<span class="fr" style="width:65%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right">'+data[i].assigneename+'</span></p>'
                                + isShowLi
                                +'<span class="prompt fr">'+data[i].flowstatus+'</span>'
                                +'</div>'
                                +'</div>'
                                +'</a>'
                                +'</li>'
                                +'<p class="space"></p>'
                        }
                        $('.agency-list').find('ul').append(ahtml||'');
                    }
                    if(data.length<10){
                        me.lock(); // 锁定 位置
                        me.noData(true);// 显示无数据
                    }
                    searchs=true; // 可以点击列表
                    me.resetload(); // 每次数据加载完，必须重置
                }
            });
            startLi +=10 ; // 每次加10
        }
    })





















