package cn.Bohai.service;

import cn.Bohai.mapper.UserMapper;
import cn.Bohai.model.User;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.hundsun.t2sdk.impl.client.T2Services;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.hundsun.t2sdk.common.core.event.EventFactory;
import com.hundsun.t2sdk.common.share.dataset.MapWriter;
import com.hundsun.t2sdk.interfaces.IClient;
import com.hundsun.t2sdk.interfaces.T2SDKException;
import com.hundsun.t2sdk.interfaces.share.dataset.IDataset;
import com.hundsun.t2sdk.interfaces.share.dataset.IDatasets;
import com.hundsun.t2sdk.interfaces.share.event.EventType;
import com.hundsun.t2sdk.interfaces.share.event.IEvent;

import cn.Bohai.Utils.T2Util;

import java.util.List;
import java.util.Map;

/**
 * Created by Jaye on 2017/5/13.
 */
@Service
public class UserService {
	
	
//	@Autowired
//	private T2Util T2util;

	
	
	
	/**
//	 * 用户登录校验
//	 * @param user
//	 */
//	@Transactional(readOnly = false)
//	public void userLoginCheck(User user){
//		userMapper.userLoginCheck(user);
//	}
	
	
	
	/**
	 * 测试T2通道
	 * @param user
	 * @throws Exception 
	 */
	@Test
	public String testBohaiLogin(User user) throws Exception{
		
		T2Util.init();
		
		//请求体
		MapWriter mw = new MapWriter();
		mw.put("userid","6666");
		mw.put("userpwd","111111");
		mw.put("clienttype","iphone");
		mw.put("interfaceid","R8001");//用户登录校验接口(R8001)
		mw.put("clientsign","meadidea.com");
		mw.put("checkcode","iphone");
		mw.put("loginmode","PWD");
		
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问登录校验
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    System.out.println(jsonString);
	    
	    //登录状态判断
//	    JSONObject jsonObject  = JSONObject.parseObject(jsonString);
//	    String loginLogo = jsonObject.getString("Code");
//	    if(loginLogo != null && loginLogo.equals("1")){
//	    	return true;
//	    }else {
//			return false;
//		}
	    
	    
		return jsonString;
	    
	    
	    
//		return results;
		
	}
	
	/**
	 * 测试接口
	 * @param user
	 */
//	@Test
	public void testPay(){
		IClient client = null;   

		// 获取T2Services实例
		T2Services sdkServices = T2Services.getInstance();
		try {
			sdkServices.init();
			sdkServices.start();
			// 获取名为 tcmpdoudou 的客户端
			client = sdkServices.getClient("tcmpdoudou");
		} catch (T2SDKException e) {
			e.printStackTrace();
		}
		MapWriter mw = new MapWriter();
		mw.put("login_account","admin");
		mw.put("password","1");
		mw.put("interfaceid","R8001");//任务处理接口
		mw.put("clientsign","meadidea.com");
		mw.put("checkcode","fake_check_code");
		mw.put("clienttype","iphone");
		mw.put("userpwd","1");
		mw.put("userid","admin");
		mw.put("instanceid","projectSetupApproval.1320063");
		
		// 访问划款流程，功能号9300  8000移动版
		IEvent event = new EventFactory().getEventByAlias("8000", EventType.ET_REQUEST);
//		IEvent event = new EventFactory().getEventByAlias("520601", EventType.ET_REQUEST);
		event.putEventData(mw.getDataset());
		
		// 同步服务调用带指定超时
		try {
			IEvent result = client.sendReceive(event);
			System.out.println("count="+result.getEventDatas().getDatasetCount());
			T2Util.printEvent(result);
		} catch (T2SDKException e) {
			e.printStackTrace();
		}
		
//		sdkServices.stop();
	}
	
	
	
//	/**
//	 * 用户登录校验接口
//	 * @param user
//	 */
////	@Test
//	@Transactional(readOnly = false)
//	public void loginCheck(User user){
//		
//		T2Util.startT2();
//		MapWriter mw= new MapWriter();
//		mw.put("userid", user.getUserid());
//		mw.put("userpwd", user.getUserpwd());
//		mw.put("clienttype", user.getClienttype());
//		mw.put("clientsign", user.getClientsign());
//		mw.put("checkcode", user.getCheckcode());
//		mw.put("loginmode", user.getLoginmode());
//	}
//	
//	
	
	
	
	
	
	
	
	
	
//    @Autowired
//    private UserMapper userMapper;
//
//    /**
//     * 添加用户
//     * @param user
//     */
//    @Transactional(readOnly = false)
//    public void addUser(User user){
//        userMapper.addUser(user);
//    }
//    /**
//     * 通过id获取用户
//     * @param id
//     * @return
//     */
//    @Transactional(readOnly = false)
//    public User getUserById(int id){
//        return userMapper.getUserById(id);
//    }
//
//    /**
//     * 通过名称查询用户
//     * @param name
//     * @return
//     */
//    public List<User> getUserByName(String name){
//        return userMapper.getUserByName(name);
//    }
//    /**
//     * 返回查询list
//     * @return
//     */
//    public List<User> getAllUserlist(){
//        return userMapper.getAllUserlist();
//    }
}
