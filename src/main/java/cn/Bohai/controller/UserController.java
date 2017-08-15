package cn.Bohai.controller;

import cn.Bohai.model.Token;
import cn.Bohai.model.User;
import cn.Bohai.service.UserService;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Junda on 2017/5/28.
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户登录校验
     * @throws Exception 
     */
    @RequestMapping(value = "/testBohaiLoginNOPWD",method = RequestMethod.GET)
    public Boolean userLoginCheck(User user){
    	Boolean jb = new Boolean(false);
    	try {
    		jb =  userService.testBohaiLoginNOPWD(user.getUserid());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jb;
    	
    }
    
    /**
     * 获取用户信息
     *  
     */
    @RequestMapping(value = "/getUserInfo",method = RequestMethod.GET)
    public JSONArray getUserInfo(User user){
    	JSONArray jsonArray = new JSONArray();
		try {
			 jsonArray = userService.getUserInfo(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonArray;
    	
    }
    
    /**
     * 兜兜SSO校验
     * 
     */
    @RequestMapping(value = "/getSSOInfo",method = RequestMethod.GET)
    public String getSSOInfo(Token token){
    	try {
			String userInfo = userService.getSSOInfo(token);
			return userInfo;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
    	
    }
    

}
