package cn.Bohai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import cn.Bohai.model.Attach;
import cn.Bohai.model.AwaitDetail;
import cn.Bohai.model.AwaitMessage;
import cn.Bohai.model.DoneMessage;
import cn.Bohai.model.HistoricalApproval;
import cn.Bohai.model.MyInitiatedProcessing;
import cn.Bohai.model.NextNode;
import cn.Bohai.model.ProcessInformation;
import cn.Bohai.model.Processing;
import cn.Bohai.model.SelectPerson;
import cn.Bohai.service.WorkflowService;

/**
 * Created by Junda on 2017/6/6.
 */
@RestController
@RequestMapping("/workflow")
public class WorkflowController {
    
	@Autowired
	private WorkflowService workflowService;
	
	
	/**
     * 获取待办消息列表
	 * @throws Exception 
     */
	@RequestMapping(value = "/getAwaitMessage",method = RequestMethod.GET)
	public JSONArray getAwaitMessage(AwaitMessage awaitMessage) throws Exception{
//		String jsonString = workflowService.getAwaitMessage(awaitMessage);
//		JSONArray jsonArray=JSON.parseArray(jsonString);
//	    JSONObject jsonObject  = JSONObject.parseObject(jsonArray.get(0).toString());
		JSONArray jsonArray = workflowService.getAwaitMessage(awaitMessage);
		return jsonArray;
	} 
	
	
	/**
     * 获取已办信息
	 * @throws Exception 
     */
	@RequestMapping(value = "/getDoneMessage",method = RequestMethod.GET)
	public JSONArray getDoneMessage(DoneMessage doneMessage) throws Exception{
//		String jsonString = workflowService.getDoneMessage(doneMessage);
//		JSONArray jsonArray=JSON.parseArray(jsonString);
//	    JSONObject jsonObject  = JSONObject.parseObject(jsonArray.get(0).toString());
		JSONArray jsonArray = workflowService.getDoneMessage(doneMessage);
		return jsonArray;
	} 
	
	/**
     * 获取待处理流程详情
	 * @throws Exception 
     */
	@RequestMapping(value = "/getAwaitDetail",method = RequestMethod.GET)
	public JSONArray getAwaitDetail(AwaitDetail awaitDetail) throws Exception{
//		String jsonString = workflowService.getAwaitDetail(awaitDetail);
//		JSONArray jsonArray=JSON.parseArray(jsonString);
//	    JSONObject jsonObject  = JSONObject.parseObject(jsonArray.get(0).toString());
		JSONArray jsonArray = workflowService.getAwaitDetail(awaitDetail);
		return jsonArray;
	} 
	
	
	/**
     * 获取流程更多信息
	 * @throws Exception 
     */
	@RequestMapping(value = "/getProcessInformation",method = RequestMethod.GET)
	public JSONArray getProcessInformation(ProcessInformation processInformation) throws Exception{
//		String jsonString = workflowService.getProcessInformation(processInformation);
//		JSONArray jsonArray=JSON.parseArray(jsonString);
//	    JSONObject jsonObject  = JSONObject.parseObject(jsonArray.get(0).toString());
	    JSONArray jsonArray = workflowService.getProcessInformation(processInformation);
		return jsonArray;
	} 
	
	/**
     * 人员选择
	 * @throws Exception 
     */
	@RequestMapping(value = "/selectPerson",method = RequestMethod.GET)
	public JSONArray selectPerson(SelectPerson selectPerson) throws Exception{
	    JSONArray jsonArray = workflowService.selectPerson(selectPerson);
		return jsonArray;
	}
	
	/**
     * 获取下一步节点
	 * @throws Exception 
     */
	@RequestMapping(value = "/getNextNode",method = RequestMethod.GET)
	public JSONArray getNextNode(NextNode nextNode) throws Exception{
//		String jsonString = workflowService.getNextNode(nextNode);
//		JSONArray jsonArray=JSON.parseArray(jsonString);
//	    JSONObject jsonObject  = JSONObject.parseObject(jsonArray.get(0).toString());
	    JSONArray jsonArray = workflowService.getNextNode(nextNode);
		return jsonArray;
	}
	
	/**
     * 历史处理意见
	 * @throws Exception 
     */
	@RequestMapping(value = "/getHistoricalApproval",method = RequestMethod.GET)
	public JSONArray getHistoricalApproval(HistoricalApproval historicalApproval) throws Exception{
//		String jsonString = workflowService.getHistoricalApproval(historicalApproval);
//		JSONArray jsonArray=JSON.parseArray(jsonString);
		JSONArray jsonArray = workflowService.getHistoricalApproval(historicalApproval);
//		Object obj1 = jsonArray.toArray()[0];
//		JSONObject obj2 = (JSONObject) obj1;
//	    JSONObject jsonObject  = JSONObject.parseObject(jsonArray.toString());
//	    String a = jsonObject.getString("attach");
//	    jsonObject.put("attachsdfasdfasdf", a);
//	    System.out.println(jsonObject);
		return jsonArray;
	}
	
	/**
     * 流程处理
	 * @throws Exception 
     */
	@RequestMapping(value = "/processProcessing",method = RequestMethod.POST)
	
	public JSONArray processProcessing(@RequestBody Processing processing) throws Exception{
//		String jsonString = workflowService.processProcessing(processing);
//		JSONArray jsonArray=JSON.parseArray(jsonString);
//	    JSONObject jsonObject  = JSONObject.parseObject(jsonArray.get(0).toString());
	    JSONArray jsonArray = workflowService.processProcessing(processing);
		return jsonArray;
	}
	
	/**
     * 查看我发起的流程
	 * @throws Exception 
     */
	@RequestMapping(value = "/getMyInitiatedProcess",method = RequestMethod.GET)
	public JSONArray getMyInitiatedProcess(MyInitiatedProcessing myInitiatedProcessing) throws Exception{
//		String jsonString = workflowService.getMyInitiatedProcess(myInitiatedProcessing);
//		JSONArray jsonArray=JSON.parseArray(jsonString);
//	    JSONObject jsonObject  = JSONObject.parseObject(jsonArray.get(0).toString());
	    JSONArray jsonArray = workflowService.getMyInitiatedProcess(myInitiatedProcessing);
		return jsonArray;
	}
	
	/**
     * 查看附件
	 * @throws Exception 
     */
//	@RequestMapping(value = "/getAttach",method = RequestMethod.GET)
//	public JSONArray getMyInitiatedProcess(Attach attach) throws Exception{
//		String jsonString = workflowService.getMyInitiatedProcess(myInitiatedProcessing);
//		JSONArray jsonArray=JSON.parseArray(jsonString);
//	    JSONObject jsonObject  = JSONObject.parseObject(jsonArray.get(0).toString());
//	    JSONArray jsonArray = workflowService.getAttach(attach);
//		return jsonArray;
//	}
	
	
}
