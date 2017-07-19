package cn.Bohai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.Bohai.model.AwaitMessage;
import cn.Bohai.model.ProjectDetail;
import cn.Bohai.model.ProjectList;
import cn.Bohai.service.ProjectService;
import cn.Bohai.service.WorkflowService;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;


@RestController
@RequestMapping("/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	
	/**
     * 获取项目列表
	 * @throws Exception 
     */
	@RequestMapping(value = "/getProjectList",method = RequestMethod.GET)
	public JSONArray getProjectList(ProjectList projectList) throws Exception{
		JSONArray jsonArray = projectService.getProjectList(projectList);
		return jsonArray;
	} 
	
	/**
     * 获取项目基本信息
	 * @throws Exception 
     */
	@RequestMapping(value = "/getProjectDetail",method = RequestMethod.GET)
	public JSONArray getProjectDetail(ProjectDetail projectDetail) throws Exception{
		JSONArray jsonArray = projectService.getProjectDetail(projectDetail);
		return jsonArray;
	} 

}
