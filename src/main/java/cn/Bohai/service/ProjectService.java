package cn.Bohai.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.Bohai.Utils.T2Util;
import cn.Bohai.common.CommonParameter;
import cn.Bohai.model.DoneMessage;
import cn.Bohai.model.ProjectDetail;
import cn.Bohai.model.ProjectList;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.hundsun.t2sdk.common.share.dataset.MapWriter;
import com.hundsun.t2sdk.interfaces.share.dataset.IDataset;
import com.hundsun.t2sdk.interfaces.share.dataset.IDatasets;

@Service
public class ProjectService {
	
	
	
	/**
	 * 获取项目列表
	 * @param doneMessage
	 * @throws Exception 
	 */
	public JSONArray getProjectList(ProjectList Projectlist) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		
		//校验参数
		mw.put("userid",Projectlist.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("projectname",Projectlist.getProjectname());
		mw.put("projectphase",Projectlist.getProjectphase());
		mw.put("depcode",Projectlist.getDepcode());
		mw.put("start",Projectlist.getStart());
		mw.put("limit",Projectlist.getLimit());
		mw.put("interfaceid","R8402");//项目列表（R8402）
		
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
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
	 * 获取项目基本信息
	 * @param doneMessage
	 * @throws Exception 
	 */
	public JSONArray getProjectDetail(ProjectDetail Projectdetail) throws Exception{
		
		T2Util.init();
		
		MapWriter mw = new MapWriter();
		//校验参数
		mw.put("userid",Projectdetail.getUserid());
		mw.put("clienttype",CommonParameter.clienttype);
		mw.put("clientsign",CommonParameter.clientsign);
		mw.put("checkcode",CommonParameter.checkcode);
		
		//请求体
		mw.put("projectcode",Projectdetail.getProjectcode());
		mw.put("interfaceid","R8403");//项目基本信息（R8403）
		
		IDatasets result = null;
		IDataset iDataset = mw.getDataset();
		
		
		//访问接口
	    result = T2Util.send("8000", iDataset);
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
