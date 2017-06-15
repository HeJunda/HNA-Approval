(function(){
	var html='<div class="popup" id="popup"><h3 class="popup-title">资金划付</h3><div class="popup-content"><p>范德萨发生的</p><p><span>发起人：</span>张江</p><p><span>发起时间：</span>2017-05-12</p><p class="btn"><a href="#" no type="0" class="cance">取消</a><a yes type="1" class="ensure" href="agency.html">确定</a></p></p></div></div>';
var index=layer.open({
	type:1,
    content: html,
    shadeClose: false
}); 
var node=document.querySelector(".cance");
	node.addEventListener("touchend", function(){
	layer.close(index);
});
})()