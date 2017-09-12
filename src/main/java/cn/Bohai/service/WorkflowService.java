package cn.Bohai.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
//import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;






//import jcifs.smb.SmbFile;







import java.util.TreeMap;






//import org.json.JSONObject;
import org.springframework.stereotype.Service;

import cn.Bohai.Utils.COMMONUtils;
import cn.Bohai.Utils.T2Util;
import cn.Bohai.common.CommonParameter;
//import cn.Bohai.model.Attach;
import cn.Bohai.model.AwaitDetail;
import cn.Bohai.model.AwaitMessage;
import cn.Bohai.model.DoneMessage;
import cn.Bohai.model.HistoricalApproval;
import cn.Bohai.model.MyInitiatedProcessing;
import cn.Bohai.model.NextNode;
import cn.Bohai.model.ProcessInformation;
import cn.Bohai.model.Processing;
import cn.Bohai.model.SelectPerson;









import cn.Bohai.model.SplitRead;
import cn.Bohai.model.User;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.hundsun.t2sdk.common.share.dataset.MapWriter;
import com.hundsun.t2sdk.interfaces.share.dataset.IDataset;
import com.hundsun.t2sdk.interfaces.share.dataset.IDatasets;


/**
 * Created by Junda on 2017/6/6.
 */
@Service
public class WorkflowService {

	
	/**
	 * 获取待办消息总条数
	 * @param User
	 * @throws Exception 
	 */
	public int getAwaitTotalNum(User user) throws Exception{
		
		T2Util.init();
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",user.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("interfaceid","R8107");//待办信息接口(R8101)
		
		
		IDataset iDataset = mw.getDataset();
		IDatasets result = null;
		
		int totalNum = 0;
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	
	    	
	    	for(int i=0;i<resultListMap.size();i++){
	    		if(resultListMap.get(i).get("flowtype").equals("_notictask")){
	    			resultListMap.remove(i);
	    		} else {
	    			String tasknum = (String) resultListMap.get(i).get("tasknum");
	    			int a = Integer.parseInt(tasknum);
	    			totalNum = totalNum + a;
	    		}
	    	}
//	    	String jsonString = JSON.toJSONString(resultListMap);
//	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
//	    	System.out.println(jsonString);
	    	return totalNum;
	    }else{
	    	return 0;
	    }
	}
	
	
	
	/**
	 * 获取待办消息分类列表
	 * @param User
	 * @throws Exception 
	 */
	public JSONArray getAwaitSortList(User user) throws Exception{
		
		T2Util.init();
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",user.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("interfaceid","R8107");//待办信息接口(R8101)
		
		
		IDataset iDataset = mw.getDataset();
		IDatasets result = null;
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");;
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	
	    	for(int i=0;i<resultListMap.size();i++){
	    		if(resultListMap.get(i).get("flowtype").equals("_notictask")){
	    			resultListMap.remove(i);
	    		}
	    	}
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	
	
	
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
		mw.put("start",awaitMessage.getStart());
		mw.put("limit",awaitMessage.getLimit());
		mw.put("flowtype",awaitMessage.getFlowtype());
//		mw.put("flowname",awaitMessage.getFlowname());//条件查询
		mw.put("interfaceid","R8101");//待办信息接口(R8101)
		
		
		IDataset iDataset = mw.getDataset();
		IDatasets result = null;
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	
	
	/**
	 * 获取已办消息列表
	 * @param doneMessage
	 * @throws Exception 
	 */
	public JSONArray getDoneMessage(DoneMessage doneMessage) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",doneMessage.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("start",doneMessage.getStart());
		mw.put("limit",doneMessage.getLimit());
//		mw.put("flowtype",doneMessage.getFlowtype());
		mw.put("flowname",doneMessage.getFlowname());
		mw.put("interfaceid","R8102");//已办信息接口(R8102)
		
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
		
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
		
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	
	/**
	 * 获取待处理流程详情
	 * @param awaitDetail
	 * @throws Exception 
	 */
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
	
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	
	/**
	 * 获取流程更多信息
	 * @param processInformation
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
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
	
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	for(int i=0;i<resultListMap.size();i++){
	    		@SuppressWarnings("rawtypes")
	    		Map map = resultListMap.get(i);
	    		
	    		//获取附件信息
	    		String attachString = (String) map.get("attach");
	    		if(attachString == null || attachString.equals("") || attachString.equals("[]")){
	    			map.put("attach", "");
	    		}else{
	    			// 去掉“\”
	    			attachString = attachString.replace("\\\\", "");
	    			// 去掉“[”
	    			attachString = attachString.replace("[", "");
	    			// 去掉“]”
	    			attachString = attachString.replace("]", "");
	    			//去掉冒号
	    			attachString = attachString.replace("\"","");
	    			List<String> attachlist = Arrays.asList(attachString.split(",")); 
	    			
	    			
	    			Map<String,String> attachMap = new HashMap<String,String>();
	    			for (int j=0;j<attachlist.size();j++) {
	    				String oneAttachString = attachlist.get(j);
	    				String[] oneAttachArray = oneAttachString.split("\\|");
	    				String newkey = oneAttachArray[0];
	    				String newValue = oneAttachArray[2];
	    				attachMap.put(newkey, newValue);
	    			}
	    			String attachMapString = JSON.toJSONString(attachMap);
	    			map.put("attach", attachMapString);
	    		}
	    		
	    		//获取基本信息类型
	    		String formtype = (String) map.get("formtype");
	    		
	    		//获取基本信息
	    		String flowinfo = (String) map.get("flowinfo");
	    		if( flowinfo == null || flowinfo.equals("") || flowinfo.equals("[]")){
	    			
	    			map.put("flowinfo", "");
	    			
	    		} else if( formtype.equals("23")){
	    			
	    			JSONArray flowInfoJsonArray = JSONArray.parseArray(flowinfo);
	    			Iterator<Object> it = flowInfoJsonArray.iterator();
	    			Map<String,String> flowInfoMap = new HashMap<String,String>();
	    			while (it.hasNext()) {
	    				JSONObject flowInfoJsonObject = (JSONObject) it.next();
	    				String newKey = flowInfoJsonObject.getString("fieldname");
	    				String newValue = flowInfoJsonObject.getString("defvalue");
	    				flowInfoMap.put(newKey, newValue);
	    			}
	    			String flowBaseInfoString = JSON.toJSONString(flowInfoMap);
    				map.put("flowinfo", flowBaseInfoString);
	    			
	    		} else if( formtype.equals("11") || formtype.equals("2")){
	    			
	    			flowinfo = flowinfo.replace("\\\\", "");
	    			JSONObject flowinfoJsonObject = JSONObject.parseObject(flowinfo);
	    			String baseFlowinfoJsonString = (String) flowinfoJsonObject.get("0|基本信息");
	    			if (baseFlowinfoJsonString == null || baseFlowinfoJsonString.equals("")) {
	    				map.put("flowinfo", "");
	    			} else {
	    				
	    				Map<String,String> baseInfoMap = JSON.parseObject(baseFlowinfoJsonString, Map.class);
	    				HashMap<Integer, String> baseInfoMapShow = new HashMap<Integer,String>();
	    				for (String key : baseInfoMap.keySet()) {
	    					String newValue = key.substring(key.indexOf('|') + 1) + ":" + baseInfoMap.get(key);
	    					String newKey = key.substring(0,key.indexOf('|'));
	    					Integer order = Integer.valueOf(newKey);
	    					baseInfoMapShow.put(order, newValue);
	    				}
//	    				Map<Integer, String> orderMap = new TreeMap<Integer, String>(
//	    						new Comparator<Integer>() {
//	    							public int compare(Integer obj1, Integer obj2) {
//	    								return obj1.compareTo(obj2);  // 升序排序
//	    							}
//	    						});
//	    				orderMap.putAll(baseInfoMapShow);
	    				
	    				//排序
	    				
	    				List<TreeMap<String,String>> finalDate = new ArrayList<TreeMap<String,String>>();
	    				for(int j=0;j<baseInfoMapShow.size();j++){
	    					TreeMap<String,String> finalInfoMapShow = new TreeMap<String,String>();
	    					if(baseInfoMapShow.get(j) != null ){
	    						String newValue = baseInfoMapShow.get(j).substring(baseInfoMapShow.get(j).indexOf(':') + 1);
	    						String newKey = baseInfoMapShow.get(j).substring(0,baseInfoMapShow.get(j).indexOf(':'));
	    						finalInfoMapShow.put(newKey, newValue);
	    						finalDate.add(finalInfoMapShow);
	    					}
	    				}
	    				String flowBaseInfoString = JSON.toJSONString(finalDate);
	    				map.put("flowinfo", flowBaseInfoString);
	    			}
	    			
	    		} else {
	    			
	    			flowinfo = flowinfo.replace("\\\\", "");
	    			if (flowinfo == null || flowinfo.equals("")) {
	    				map.put("flowinfo", "");
	    			} else {
	    				
	    				Map<String,String> baseInfoMap = JSON.parseObject(flowinfo, Map.class);
	    				HashMap<Integer, String> baseInfoMapShow = new HashMap<Integer,String>();
	    				for (String key : baseInfoMap.keySet()) {
    						String newValue = key.substring(key.indexOf('|') + 1) + ":" + baseInfoMap.get(key);
    						String newKey = key.substring(0,key.indexOf('|'));
    						Integer order = Integer.valueOf(newKey);
    						baseInfoMapShow.put(order, newValue);
	    				}
	    				//排序
	    				List<TreeMap<String,String>> finalDate = new ArrayList<TreeMap<String,String>>();
	    				for(int j=0;j<baseInfoMapShow.size();j++){
	    					TreeMap<String,String> finalInfoMapShow = new TreeMap<String,String>();
	    					if(baseInfoMapShow.get(j) != null ){
	    						String newValue = baseInfoMapShow.get(j).substring(baseInfoMapShow.get(j).indexOf(':') + 1);
	    						String newKey = baseInfoMapShow.get(j).substring(0,baseInfoMapShow.get(j).indexOf(':'));
	    						finalInfoMapShow.put(newKey, newValue);
	    						finalDate.add(finalInfoMapShow);
	    					}
	    				}
	    				String flowBaseInfoString = JSON.toJSONString(finalDate);
	    				map.put("flowinfo", flowBaseInfoString);
	    			}
	    		}
	    	}
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	    
	    
	}
	
	/**
	 * 查看历史审批意见
	 * @param historicalApproval
	 * @throws Exception 
	 */
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
	
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
	    if(result != null){
	    	
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	for(int i=0;i<resultListMap.size();i++){
	    		@SuppressWarnings("rawtypes")
	    		Map map = resultListMap.get(i);
	    		String attachString = (String) map.get("attach");
	    		
	    		if(attachString == null || attachString.equals("") || attachString.equals("[]")){
	    			map.put("attach", "");
	    		}else{
	    			//去掉斜杠
	    			attachString = attachString.replace("\\\\", "");
	    			// 去掉“[”
	    			attachString = attachString.replace("[", "");
	    			// 去掉“]”
	    			attachString = attachString.replace("]", "");
	    			//去掉冒号
	    			attachString = attachString.replace("\"","");
	    			List<String> attachlist = Arrays.asList(attachString.split(",")); 
	    			
	    			Map<String,String> attachMap = new HashMap<String,String>();
	    			for (int j=0;j<attachlist.size();j++) {
	    				String oneAttachString = attachlist.get(j);
	    				String[] oneAttachArray = oneAttachString.split("\\|");
	    				String newkey = oneAttachArray[0];
	    				String newValue = oneAttachArray[2];
	    				attachMap.put(newkey, newValue);
	    			}
	    			String attachMapString = JSON.toJSONString(attachMap);
	    			map.put("attach", attachMapString);
	    		}
	    	}
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	
	/**
	 * 查询我发起的流程
	 * @param historicalApproval
	 * @throws Exception 
	 */
	public JSONArray getMyInitiatedProcess (MyInitiatedProcessing myInitiatedProcessing) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",myInitiatedProcessing.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("start",myInitiatedProcessing.getStart());
		mw.put("limit",myInitiatedProcessing.getLimit());
		mw.put("interfaceid","R8129");//我发起的流程(R8129)
	
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");

	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	
	
	
	
	/**
	 * 人员选择
	 * @param historicalApproval
	 * @throws Exception 
	 */
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
	
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	
	/**
	 * 获取下一步节点
	 * @param historicalApproval
	 * @throws Exception 
	 */
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
	    
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	

	
	/**
	 * 流程处理
	 * @param historicalApproval
	 * @throws Exception 
	 */
	public JSONArray processProcessing (Processing processing) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",processing.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("taskid",processing.getTaskid());
		mw.put("actionname",processing.getActionname());
		mw.put("remark",processing.getRemark());
		mw.put("actiontype",processing.getActiontype());
		mw.put("actionvalue",processing.getActionvalue());
		mw.put("nextopermap",processing.getNextopermap());
		mw.put("comeback",processing.getComeback());
		mw.put("formtype",processing.getFormtype());
		mw.put("receiveuserids",processing.getReceiveuserids());	
		mw.put("interfaceid","R8100");//流程处理接口(R8100)
	    
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	
	/**
	 * 获取常用语
	 * @param user
	 * @throws Exception 
	 */
	public JSONArray getCommonlanguage (User user) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",user.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("interfaceid","R8123");//获取常用语接口(R8123)
	    
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	
	/**
	 * 待阅/已阅数据
	 * @param user
	 * @throws Exception 
	 */
	public JSONArray getSplitRead(SplitRead splitRead) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",splitRead.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("hasread",splitRead.getHasread());
		mw.put("flowname",splitRead.getFlowname());
		mw.put("interfaceid","R8125");//待阅/已阅数据接口(R8125)
	    
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		//访问接口
		long startTime=System.currentTimeMillis();   //获取开始时间
		result = T2Util.send("8000", iDataset);
		long endTime=System.currentTimeMillis(); //获取结束时间
		System.out.println("接口调用时间： "+(endTime-startTime)+"ms");
	    if(result != null){
	    	@SuppressWarnings("rawtypes")
	    	List<Map> resultListMap = T2Util.dataset2MapList(result);
	    	String jsonString = JSON.toJSONString(resultListMap);
	    	JSONArray jsonArray = JSONArray.parseArray(jsonString);
	    	System.out.println(jsonString);
	    	return jsonArray;
	    }else{
	    	return null;
	    }
	}
	
	
}
