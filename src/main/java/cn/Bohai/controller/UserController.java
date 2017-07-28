package cn.Bohai.controller;

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
    @RequestMapping(value = "/userLoginCheck",method = RequestMethod.GET)
    public Boolean userLoginCheck(User user){
    	Boolean jb = new Boolean(false);
    	try {
    		jb =  userService.testBohaiLogin();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jb;
    	
    }
    
    /**
     * 获取用户信息
     * @throws Exception 
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
    
    
//    @RequestMapping(value = "/addUser",method = RequestMethod.POST)
//    public void addUser(){
//        User user=new User();
//        user.setName("lee");
//        userService.addUser(user);
//    }
//    @RequestMapping(value = "/getUserById",method = RequestMethod.POST)
//    public String getUserById(){
//        return JSON.toJSONString(userService.getUserById(1));
//    }
//    @RequestMapping(value = "/getUserByName",method = RequestMethod.POST)
//    public String getUserByName(){
//        return JSON.toJSONString(userService.getUserByName("jaye"));
//    }
//
//    @RequestMapping("/query/{page}/{pageSize}")
//    public String query(@PathVariable Integer page, @PathVariable Integer pageSize) {
//        if(page!= null && pageSize!= null){
//            PageHelper.startPage(page, pageSize);
//        }
//        List<User> users = userService.getAllUserlist();
//        String s=JSON.toJSONString(new PageInfo(users));
//        return s;
//    }


}
