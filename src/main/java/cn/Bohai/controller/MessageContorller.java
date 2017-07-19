package cn.Bohai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.Bohai.model.Message;
import cn.Bohai.service.MessageService;

import com.alibaba.fastjson.JSONArray;


/**
 * Created by Junda on 2017/7/6.
 */
@RestController
@RequestMapping("/message")
public class MessageContorller {
	
	@Autowired
	private MessageService messageService;
	
	
	/**
     * 获取消息列表
	 * @throws Exception 
     */
	@RequestMapping(value = "/getMessageList",method = RequestMethod.GET)
	public JSONArray getAwaitMessage(Message message) throws Exception{
		JSONArray jsonArray = messageService.getMessageList(message);
		return jsonArray;
	} 

}
