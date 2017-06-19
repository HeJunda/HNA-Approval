package cn.Bohai.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.Bohai.Utils.T2Util;
import cn.Bohai.model.DoneMessage;
import cn.Bohai.model.ProjectDetail;
import cn.Bohai.model.ProjectList;

import com.alibaba.fastjson.JSON;
import com.hundsun.t2sdk.common.share.dataset.MapWriter;
import com.hundsun.t2sdk.interfaces.share.dataset.IDataset;

@Service
public class ProjectService {
	
	
	
	/**
	 * 获取项目列表
	 * @param doneMessage
	 * @throws Exception 
	 */
//	@Test
	public String getProjectList(ProjectList Projectlist) throws Exception{
		
		T2Util.init();
		
		//请求体
		MapWriter mw = new MapWriter();
		mw.put("userid",Projectlist.getUserid());
		mw.put("projectname",Projectlist.getProjectname());
		mw.put("projectphase",Projectlist.getProjectphase());
		mw.put("depcode",Projectlist.getDepcode());
		mw.put("start",0);
		mw.put("limit",10);
		mw.put("interfaceid","R8402");//项目列表（R8402）
		
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
	 * 获取项目基本信息
	 * @param doneMessage
	 * @throws Exception 
	 */
//	@Test
	public String getProjectDetail(ProjectDetail Projectdetail) throws Exception{
		
		T2Util.init();
		
		//请求体
		MapWriter mw = new MapWriter();
		mw.put("projectcode",Projectdetail.getProjectcode());
		mw.put("interfaceid","R8403");//项目基本信息（R8403）
		
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
