package cn.Bohai.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Service;

import com.hundsun.t2sdk.common.share.dataset.MapWriter;
import com.hundsun.t2sdk.interfaces.share.dataset.IDataset;
import com.hundsun.t2sdk.interfaces.share.dataset.IDatasets;

import cn.Bohai.Utils.T2Util;
import cn.Bohai.common.CommonParameter;

import java.util.List;
import java.util.Map;

/**
 * Created by Jaye on 2017/5/13.
 */
@Service
public class UserService {
	
	
	
	/**
	 * 用户登录校验
	 * @param user
	 * @throws Exception 
	 */
	public boolean testBohaiLogin() throws Exception{
		
		T2Util.init();
		
		//请求体
		MapWriter mw = new MapWriter();
		
		mw.put("userid","6666");
		mw.put("userpwd","111111");
		
		//校验参数
//		mw.put("userid",awaitMessage.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		
		mw.put("interfaceid","R8001");//用户登录校验接口(R8001)
		mw.put("loginmode","PWD");
		
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问登录校验
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    
	    
	    //先转为JSONArray，再转为JSONObject
	    String jsonString = JSON.toJSONString(resultListMap);
	    System.out.println(jsonString);
	    JSONArray jsonArray=JSON.parseArray(jsonString);
	    JSONObject jsonObject  = JSONObject.parseObject(jsonArray.get(0).toString());
	    
	    
	    //登录状态判断
	    String loginLogo = jsonObject.getString("code");
	    if(loginLogo != null && loginLogo.equals("1")){
	    	System.out.println("用户已登录");
	    	return true;
	    } else {
	    	System.out.println("用户未登录");
			return false;
		}
	    
	    
//		return jsonString;
//		return results;
		
	}
	
}
