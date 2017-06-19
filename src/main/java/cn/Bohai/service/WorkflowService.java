package cn.Bohai.service;

import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.stereotype.Service;

import cn.Bohai.Utils.T2Util;
import cn.Bohai.model.AwaitDetail;
import cn.Bohai.model.AwaitMessage;
import cn.Bohai.model.DoneMessage;
import cn.Bohai.model.HistoricalApproval;
import cn.Bohai.model.ProcessInformation;
import cn.Bohai.model.Processing;

import com.alibaba.fastjson.JSON;
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
	public String getAwaitMessage(AwaitMessage awaitMessage) throws Exception{
		
		T2Util.init();
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("clienttype","iphone");
		mw.put("clientsign","meadidea.com");
		mw.put("checkcode","iphone");
		
		//请求体
		mw.put("userid",awaitMessage.getUserid());
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
	    System.out.println(jsonString);
	    
		return jsonString;
	}
	
	
	/**
	 * 获取已办消息列表
	 * @param doneMessage
	 * @throws Exception 
	 */
//	@Test
	public String getDoneMessage(DoneMessage doneMessage) throws Exception{
		
		T2Util.init();
		
		//请求体
		MapWriter mw = new MapWriter();
		mw.put("userid",doneMessage.getUserid());
		mw.put("clienttype","iphone");
		mw.put("clientsign","meadidea.com");
		mw.put("checkcode","iphone");
		mw.put("start",0);
		mw.put("limit",10);
//		mw.put("flowtype",doneMessage.getFlowtype());
//		mw.put("flowname",doneMessage.getFlowname());
		mw.put("interfaceid","R8102");//已办信息接口(R8102)
		
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    System.out.println(jsonString);
		return jsonString;
	}
	
	/**
	 * 获取待处理流程详情
	 * @param awaitDetail
	 * @throws Exception 
	 */
//	@Test
	public String getAwaitDetail (AwaitDetail awaitDetail) throws Exception{
		
		T2Util.init();
		
		//请求体
		MapWriter mw = new MapWriter();
		mw.put("userid",awaitDetail.getUserid());
		mw.put("clienttype","iphone");
		mw.put("clientsign","meadidea.com");
		mw.put("checkcode","iphone");
		mw.put("taskid",awaitDetail.getTaskid());
		mw.put("pagefrom",awaitDetail.getPagefrom());
		mw.put("flowname",awaitDetail.getFlowname());
		mw.put("interfaceid","R8103");//获取待办消息详情接口(R8103)
	
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    System.out.println(jsonString);
		return jsonString;
	}
	
	/**
	 * 获取待办消息详情
	 * @param processInformation
	 * @throws Exception 
	 */
	public String getProcessInformation (ProcessInformation processInformation) throws Exception{
		
		T2Util.init();
		
		//请求体
		MapWriter mw = new MapWriter();
		mw.put("userid","6666");
		mw.put("clienttype","iphone");
		mw.put("clientsign","meadidea.com");
		mw.put("checkcode","iphone");
		mw.put("instanceid",processInformation.getInstanceid());
		mw.put("interfaceid","R8104");//待办消息详情接口(R8104)
	
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    System.out.println(jsonString);
		return jsonString;
	}
	
	/**
	 * 查看历史审批意见
	 * @param historicalApproval
	 * @throws Exception 
	 */
//	@Test
	public String getHistoricalApproval (HistoricalApproval historicalApproval) throws Exception{
		
		T2Util.init();
		
		//请求体
		MapWriter mw = new MapWriter();
		mw.put("instanceid",historicalApproval.getInstanceid());
		mw.put("userid",historicalApproval.getUserid());
		mw.put("clienttype","iphone");
		mw.put("clientsign","meadidea.com");
		mw.put("checkcode","iphone");
		mw.put("start",historicalApproval.getStart());
		mw.put("limit",historicalApproval.getLimit());
		mw.put("interfaceid","R8105");//查看历史审批意见接口(R8105)
	
		IDataset result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
	    @SuppressWarnings("rawtypes")
		List<Map> resultListMap = T2Util.dataset2MapList(result);
	    String jsonString = JSON.toJSONString(resultListMap);
	    System.out.println(jsonString);
		return jsonString;
	}
	
	/**
	 * 流程处理
	 * @param historicalApproval
	 * @throws Exception 
	 */
//	@Test
	public String processProcessing (Processing processing) throws Exception{
		
		T2Util.init();
		
		//请求体
		MapWriter mw = new MapWriter();
		mw.put("userid",processing.getUserid());
		mw.put("clienttype","iphone");
		mw.put("clientsign","meadidea.com");
		mw.put("checkcode","iphone");
		mw.put("taskeid",processing.getTaskeid());
		mw.put("actionname",processing.getActionname());
		mw.put("remark",processing.getRemark());
		mw.put("actiontype",processing.getActiontype());
		mw.put("actionvalue",processing.getActionvalue());
		mw.put("nextopermap",processing.getNextopermap());
		mw.put("flowvar",processing.getFlowvar());
		mw.put("comeback",processing.getComeback());
		mw.put("clienttype",processing.getClienttype());
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
	    System.out.println(jsonString);
		return jsonString;
	}
}
