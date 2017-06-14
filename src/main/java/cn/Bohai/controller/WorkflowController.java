package cn.Bohai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;

import cn.Bohai.model.AwaitDetail;
import cn.Bohai.model.AwaitMessage;
import cn.Bohai.model.DoneMessage;
import cn.Bohai.model.HistoricalApproval;
import cn.Bohai.model.ProcessInformation;
import cn.Bohai.model.Processing;
import cn.Bohai.service.WorkflowService;

/**
 * Created by Junda on 2017/6/6.
 */
@RestController
public class WorkflowController {
    
	@Autowired
	private WorkflowService workflowService;
	
	
	/**
     * 获取待办消息列表
	 * @throws Exception 
     */
	@RequestMapping(value = "/getAwaitMessage",method = RequestMethod.GET)
	public JSONObject getAwaitMessage(AwaitMessage awaitMessage) throws Exception{
		String jsonString = workflowService.getAwaitMessage(awaitMessage);
		JSONObject jsonObject  = JSONObject.parseObject(jsonString);
		return jsonObject;
	} 
	
	
	/**
     * 获取已办信息
	 * @throws Exception 
     */
	@RequestMapping(value = "/getDoneMessage",method = RequestMethod.POST)
	public JSONObject getDoneMessage(DoneMessage doneMessage) throws Exception{
		String jsonString = workflowService.getDoneMessage(doneMessage);
		JSONObject jsonObject  = JSONObject.parseObject(jsonString);
		return jsonObject;
	} 
	
	/**
     * 获取待处理流程详情
	 * @throws Exception 
     */
	@RequestMapping(value = "/getAwaitDetail",method = RequestMethod.POST)
	public JSONObject getAwaitDetail(AwaitDetail awaitDetail) throws Exception{
		String jsonString = workflowService.getAwaitDetail(awaitDetail);
		JSONObject jsonObject  = JSONObject.parseObject(jsonString);
		return jsonObject;
	} 
	
	
	/**
     * 流程信息查看
	 * @throws Exception 
     */
	@RequestMapping(value = "/getProcessInformation",method = RequestMethod.POST)
	public JSONObject getProcessInformation(ProcessInformation processInformation) throws Exception{
		String jsonString = workflowService.getProcessInformation(processInformation);
		JSONObject jsonObject  = JSONObject.parseObject(jsonString);
		return jsonObject;
	} 
	
	/**
     * 查看历史审批意见
	 * @throws Exception 
     */
	@RequestMapping(value = "/getHistoricalApproval",method = RequestMethod.POST)
	public JSONObject getHistoricalApproval(HistoricalApproval historicalApproval) throws Exception{
		String jsonString = workflowService.getHistoricalApproval(historicalApproval);
		JSONObject jsonObject  = JSONObject.parseObject(jsonString);
		return jsonObject;
	}
	
	/**
     * 流程处理
	 * @throws Exception 
     */
	@RequestMapping(value = "/processProcessing",method = RequestMethod.POST)
	public JSONObject processProcessing(Processing processing) throws Exception{
		String jsonString = workflowService.processProcessing(processing);
		JSONObject jsonObject  = JSONObject.parseObject(jsonString);
		return jsonObject;
	}
	
	
	
}
