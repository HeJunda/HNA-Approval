package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Jaye on 2017/5/13.
 */
public class AwaitDetail implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 任务ID
     */
    private String taskid;
    /**
     * 页面来源
     */
    private String pagefrom;
    /**
     * 流程类型
     */
    private String flowtype;
    
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getTaskid() {
		return taskid;
	}
	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}
	public String getPagefrom() {
		return pagefrom;
	}
	public void setPagefrom(String pagefrom) {
		this.pagefrom = pagefrom;
	}
	public String getFlowtype() {
		return flowtype;
	}
	public void setFlowtype(String flowtype) {
		this.flowtype = flowtype;
	}
	
    
    
     
}
