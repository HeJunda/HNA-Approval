package cn.Bohai.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.Bohai.Utils.T2Util;
import cn.Bohai.common.CommonParameter;
import cn.Bohai.model.Message;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.hundsun.t2sdk.common.share.dataset.MapWriter;
import com.hundsun.t2sdk.interfaces.share.dataset.IDataset;
import com.hundsun.t2sdk.interfaces.share.dataset.IDatasets;


@Service
public class MessageService {
	
	/**
	 * 获取消息列表
	 * @param awaitMessage
	 * @throws Exception 
	 */
	public JSONArray getMessageList(Message message) throws Exception{
		
		T2Util.init();
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",message.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("start",message.getStart());
		mw.put("limit",message.getLimit());
		mw.put("interfaceid","R8200");//消息接口(R8200)
		
		
		IDataset iDataset = mw.getDataset();
		IDatasets result = null;
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}

}
