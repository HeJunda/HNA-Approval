package cn.Bohai.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.stereotype.Service;

import cn.Bohai.Utils.T2Util;
import cn.Bohai.common.CommonParameter;
import cn.Bohai.model.AwaitDetail;
import cn.Bohai.model.AwaitMessage;
import cn.Bohai.model.DoneMessage;
import cn.Bohai.model.HistoricalApproval;
import cn.Bohai.model.MyInitiatedProcessing;
import cn.Bohai.model.NextNode;
import cn.Bohai.model.ProcessInformation;
import cn.Bohai.model.Processing;
import cn.Bohai.model.SelectPerson;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hundsun.t2sdk.common.share.dataset.MapWriter;
import com.hundsun.t2sdk.interfaces.share.dataset.IDataset;


/**
 * Created by Junda on 2017/6/6.
 */
@Service
public class WorkflowService {

	
	
	/**
	 * 获取待办消息列表
	 * @param awaitMessage
	 * @throws Exception 
	 */
	public JSONArray getAwaitMessage(AwaitMessage awaitMessage) throws Exception{
		
		T2Util.init();
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",awaitMessage.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("start",0);
		mw.put("limit",10);
//		mw.put("flowname",awaitMessage.getFlowname());//条件查询
		mw.put("interfaceid","R8101");//待办信息接口(R8101)
		
		
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
		IDataset result = null;
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    System.out.println(jsonArray);
	    
		return jsonArray;
	}
	
	
	/**
	 * 获取已办消息列表
	 * @param doneMessage
	 * @throws Exception 
	 */
//	@Test
	public JSONArray getDoneMessage(DoneMessage doneMessage) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",doneMessage.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("start",0);
		mw.put("limit",10);
//		mw.put("flowtype",doneMessage.getFlowtype());
		mw.put("flowname",doneMessage.getFlowname());
		mw.put("interfaceid","R8102");//已办信息接口(R8102)
		
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    System.out.println(jsonString);
		return jsonArray;
	}
	
	/**
	 * 获取待处理流程详情
	 * @param awaitDetail
	 * @throws Exception 
	 */
//	@Test
	public JSONArray getAwaitDetail (AwaitDetail awaitDetail) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",awaitDetail.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("taskid",awaitDetail.getTaskid());
		mw.put("pagefrom",awaitDetail.getPagefrom());
		mw.put("flowtype",awaitDetail.getFlowtype());
		mw.put("interfaceid","R8103");//获取待办消息详情接口(R8103)
	
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    System.out.println(jsonString);
		return jsonArray;
	}
	
	/**
	 * 获取流程更多信息
	 * @param processInformation
	 * @throws Exception 
	 */
	public JSONArray getProcessInformation (ProcessInformation processInformation) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		//校验参数
		mw.put("userid",processInformation.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("instanceid",processInformation.getInstanceid());
		mw.put("interfaceid","R8104");//待办消息详情接口(R8104)
	
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    System.out.println(jsonString);
		return jsonArray;
	}
	
	/**
	 * 查看历史审批意见
	 * @param historicalApproval
	 * @throws Exception 
	 */
//	@Test
	@SuppressWarnings("unchecked")
	public JSONArray getHistoricalApproval (HistoricalApproval historicalApproval) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",historicalApproval.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("instanceid",historicalApproval.getInstanceid());
		mw.put("start",historicalApproval.getStart());
		mw.put("limit",historicalApproval.getLimit());
		mw.put("interfaceid","R8105");//查看历史审批意见接口(R8105)
	
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    for(int i=0;i<resultListMap.size();i++){
	    	@SuppressWarnings("rawtypes")
	    	Map map = resultListMap.get(i);
	    	String attach = (String) map.get("attach");
	    	JSONArray attachJsonArray = JSONArray.parseArray(attach);
	    	map.put("attach", attachJsonArray);
	    }
	    String jsonString = JSON.toJSONString(resultListMap);
	    JSONArray jsonArray = JSONArray.parseArray(jsonString);
//	    JSON.toJSON
//	    String jsonString = JSONArray.;
//	    JSONArray array = 
//	    System.out.println(jsonString);
		return jsonArray;
	}
	
	/**
	 * 查询我发起的流程
	 * @param historicalApproval
	 * @throws Exception 
	 */
//	@Test
	public JSONArray getMyInitiatedProcess (MyInitiatedProcessing myInitiatedProcessing) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",myInitiatedProcessing.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("start",0);
		mw.put("limit",10);
		mw.put("interfaceid","R8129");//我发起的流程(R8129)
	
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    System.out.println(jsonString);
		return jsonArray;
	}
	
	
	
	
	/**
	 * 人员选择
	 * @param historicalApproval
	 * @throws Exception 
	 */
//	@Test
	public JSONArray selectPerson(SelectPerson Selectperson) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",Selectperson.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("taskid",Selectperson.getTaskid());
		mw.put("actionvalue",Selectperson.getActionvalue());
		mw.put("nodename",Selectperson.getNodename());
		mw.put("actiontype",Selectperson.getActiontype());
		mw.put("instanceid",Selectperson.getInstanceid());
		mw.put("interfaceid","R8108");//人员选择接口(R8108)
	
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    System.out.println(jsonString);
		return jsonArray;
	}
	
	/**
	 * 获取下一步节点
	 * @param historicalApproval
	 * @throws Exception 
	 */
//	@Test
	public JSONArray getNextNode(NextNode nextNode) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",nextNode.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("taskid",nextNode.getTaskid());
		mw.put("actionvalue",nextNode.getActionvalue());
		mw.put("interfaceid","R8109");//获取下一步节点(R8109)
	
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    System.out.println(jsonString);
		return jsonArray;
	}
	

	/**
	 * 获取人员列表
	 * @param historicalApproval
	 * @throws Exception 
	 */
//	@Test
//	public String getPersonList(SelectPerson Selectperson) throws Exception{
//		
//		NextNode nextNode = new NextNode();
//		nextNode.setActionvalue(Selectperson.getActionvalue());
//		nextNode.setTaskid(Selectperson.getTaskid());
//		nextNode.setUserid(Selectperson.getUserid());
//		String nextNodeString = getNextNode(nextNode);
//		JSONArray jsonArray=JSON.parseArray(nextNodeString);
//		JSONObject jsonObject  = JSONObject.parseObject(jsonArray.get(0).toString());
//		Selectperson.setNodename(jsonObject.get("nodename").toString());
//		
//        T2Util.init();
//		
//		MapWriter mw = new MapWriter();
//		
//		//校验参数
//		mw.put("userid",Selectperson.getUserid());
//		mw.put("clienttype",CommonParameter.clienttype);
//		mw.put("clientsign",CommonParameter.clientsign);
//		mw.put("checkcode",CommonParameter.checkcode);
//		
//		//请求体
//		mw.put("taskid",Selectperson.getTaskid());
//		mw.put("actionvalue",Selectperson.getActionvalue());
//		mw.put("nodename",Selectperson.getNodename());
//		mw.put("actiontype",Selectperson.getActiontype());
//		mw.put("instanceid",Selectperson.getInstanceid());
//		mw.put("interfaceid","R8108");//人员选择接口(R8108)
//		
//		IDataset result = null;
//		IDataset iDataset = mw.getDataset();
//		
//		//访问接口
//	    result = T2Util.send("8000", iDataset);
//	    @SuppressWarnings("rawtypes")
//		List<Map> resultListMap = T2Util.dataset2MapList(result);
//	    String jsonString = JSON.toJSONString(resultListMap);
//	    System.out.println(jsonString);
//		return jsonString;
//		
//	}
	
	/**
	 * 流程处理
	 * @param historicalApproval
	 * @throws Exception 
	 */
//	@Test
	public JSONArray processProcessing (Processing processing) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",processing.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("taskeid",processing.getTaskid());
		mw.put("actionname",processing.getActionname());
		mw.put("remark",processing.getRemark());
		mw.put("actiontype",processing.getActiontype());
		mw.put("actionvalue",processing.getActionvalue());
		mw.put("nextopermap",processing.getNextopermap());
		mw.put("comeback",processing.getComeback());
		mw.put("formtype",processing.getFormtype());
		mw.put("receiveuserids",processing.getReceiveuserids());	
		mw.put("interfaceid","R8100");//流程处理接口(R8100)
	
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    System.out.println(jsonString);
		return jsonArray;
	}
}
