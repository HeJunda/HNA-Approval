package cn.Bohai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cn.Bohai.model.AwaitMessage;
import cn.Bohai.model.ProjectDetail;
import cn.Bohai.model.ProjectList;
import cn.Bohai.model.User;
import cn.Bohai.service.ProjectService;
import cn.Bohai.service.UserService;
import cn.Bohai.service.WorkflowService;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;


@RestController
@RequestMapping("/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	@Autowired
	private UserService userService;
	
	
	/**
     * 获取项目列表
	 * @throws Exception 
     */
	@RequestMapping(value = "/getProjectList",method = RequestMethod.GET)
	public JSONArray getProjectList(ProjectList projectList){
		JSONArray jsonArray = new JSONArray();
		try {
			 jsonArray = projectService.getProjectList(projectList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonArray;
	} 
	
	/**
     * 获取本部门下项目列表（改为前端同步请求）
	 * @throws Exception 
     */
	@RequestMapping(value = "/getMyDeptProjectList",method = RequestMethod.GET)
	public JSONArray getMyDeptProjectList(ProjectList projectList){
		JSONArray jsonArray = new JSONArray();
		try {
			User user = new User();
			user.setUserid(projectList.getUserid());
			JSONArray jsonArray1 = userService.getUserInfo(user);
			JSONObject jsonObject1  = JSONObject.parseObject(jsonArray1.get(0).toString());
			String dept = (String) jsonObject1.get("orgid");
			projectList.setDepcode(dept);
		    jsonArray = projectService.getProjectList(projectList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonArray;
	} 
	
	/**
     * 获取项目基本信息
	 * @throws Exception 
     */
	@RequestMapping(value = "/getProjectDetail",method = RequestMethod.GET)
	public JSONArray getProjectDetail(ProjectDetail projectDetail){
		JSONArray jsonArray = new JSONArray();
		try {
			 jsonArray = projectService.getProjectDetail(projectDetail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonArray;
	} 

}
