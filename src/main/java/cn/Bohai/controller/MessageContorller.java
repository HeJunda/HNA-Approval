package cn.Bohai.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	
	
	private static Logger logger=LoggerFactory.getLogger(WorkflowController.class); 
	
	@Autowired
	private MessageService messageService;
	
	
	/**
     * 获取消息列表
	 * @throws Exception 
     */
	@RequestMapping(value = "/getMessageList",method = RequestMethod.GET)
	public JSONArray getAwaitMessage(Message message){
		JSONArray jsonArray = new JSONArray();
		try {
			 jsonArray = messageService.getMessageList(message);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
		return jsonArray;
	} 

}
