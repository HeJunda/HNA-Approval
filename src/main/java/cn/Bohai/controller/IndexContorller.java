package cn.Bohai.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.Bohai.model.User;


/**
 * Created by Junda on 2017/6/14.
 */
@Controller
public class IndexContorller {
	
	/**
     * 用户登录校验
     * @throws Exception 
     */
    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String toIndex() throws Exception{
		return "index";
    }

}
