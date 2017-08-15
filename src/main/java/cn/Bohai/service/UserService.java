package cn.Bohai.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.stereotype.Service;

import com.hundsun.t2sdk.common.share.dataset.MapWriter;
import com.hundsun.t2sdk.interfaces.share.dataset.IDataset;
import com.hundsun.t2sdk.interfaces.share.dataset.IDatasets;

import cn.Bohai.Utils.COMMONUtils;
import cn.Bohai.Utils.SSOUtil;
import cn.Bohai.Utils.T2Util;
import cn.Bohai.common.CommonParameter;
import cn.Bohai.model.Token;
import cn.Bohai.model.User;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by Junda on 2017/5/13.
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
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		
		mw.put("interfaceid","R8001");//用户登录校验接口(R8001)
		mw.put("loginmode","PWD");
		
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问登录校验
	    result = T2Util.send("8000", iDataset);
	    if(result != null){
	    	
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	
	    	//先转为JSONArray，再转为JSONObject
	    	String jsonString = JSON.toJSONString(resultListMap);
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
	    } else {
	    	return false;
	    }
	    
		
	}
	
	/**
	 * 用户登录校验(免密)
	 * @param user
	 * @throws Exception 
	 */
	public Boolean testBohaiLoginNOPWD(String userid) throws Exception{
		
		T2Util.init();
		
		//请求体
		MapWriter mw = new MapWriter();
		
		//用户ID
		mw.put("userid",userid);
		
		//校验参数
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//获取时间戳
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("YYYYMMDDHHMMSS");
		String logintime = sdf.format(date);
		mw.put("logintime",logintime);
		
	    //生成登录安全码
		String logincode = CommonParameter.clienttype+"|"+userid+"|"+logintime+"|"+"TCMPAPPLOGIN123";
		System.out.println("logincode:"+logincode);
		
		String loginCodeMD5 = COMMONUtils.ToMD5(logincode);
		System.out.println("loginCodeMD5:"+loginCodeMD5);
		mw.put("logincode",loginCodeMD5);
		
		//登录模式设为免密登录
		mw.put("loginmode","NOPWD");
		
		mw.put("interfaceid","R8001");//用户登录校验接口(R8001)
		
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问登录校验
	    result = T2Util.send("8000", iDataset);
	    if(result != null){
	    	
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	
	    	//先转为JSONArray，再转为JSONObject
	    	String jsonString = JSON.toJSONString(resultListMap);
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
	    } else {
	    	return false;
	    }
	}
	
	/**
	 * 获取用户信息
	 * @param userId
	 * @throws Exception 
	 */
	public JSONArray getUserInfo(User user) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",user.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("interfaceid","R8004");//获取用户信息接口(R8004)
		
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
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
	
	/**
	 * 获取用户信息
	 * @param token
	 * @throws Exception 
	 */
	public String getSSOInfo(Token token) throws Exception{
		try {
			String userInfo = SSOUtil.CheckTokenBySSO(token.getToken());
			return userInfo;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
		
	}
	

}
