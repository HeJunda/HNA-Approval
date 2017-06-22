package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Jaye on 2017/5/13.
 */
public class NextNode implements Serializable {

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
     * 按钮值
     */
    private String actionvalue;
    
    
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
	public String getActionvalue() {
		return actionvalue;
	}
	public void setActionvalue(String actionvalue) {
		this.actionvalue = actionvalue;
	}
    
    
    
    
     
}
