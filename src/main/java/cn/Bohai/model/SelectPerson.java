package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Jaye on 2017/5/13.
 */
public class SelectPerson implements Serializable {

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
    /**
     * 按钮类型
     */
    private String actiontype;
    /**
     * 节点名称
     */
    private String nodename;
    /**
     * 选人方式
     */
    private String isskipnode;
    /**
     * ----
     */
    private String skipnodeselecttype;
    /**
     * 选人参数值
     */
    private String skipnodeselectvalue;
    /**
     * 流程实例ID
     */
    private String instanceid;
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
	public String getNodename() {
		return nodename;
	}
	public void setNodename(String nodename) {
		this.nodename = nodename;
	}
	public String getIsskipnode() {
		return isskipnode;
	}
	public void setIsskipnode(String isskipnode) {
		this.isskipnode = isskipnode;
	}
	public String getSkipnodeselecttype() {
		return skipnodeselecttype;
	}
	public void setSkipnodeselecttype(String skipnodeselecttype) {
		this.skipnodeselecttype = skipnodeselecttype;
	}
	public String getSkipnodeselectvalue() {
		return skipnodeselectvalue;
	}
	public void setSkipnodeselectvalue(String skipnodeselectvalue) {
		this.skipnodeselectvalue = skipnodeselectvalue;
	}
	public String getInstanceid() {
		return instanceid;
	}
	public void setInstanceid(String instanceid) {
		this.instanceid = instanceid;
	}
	public String getActionvalue() {
		return actionvalue;
	}
	public void setActionvalue(String actionvalue) {
		this.actionvalue = actionvalue;
	}
	public String getActiontype() {
		return actiontype;
	}
	public void setActiontype(String actiontype) {
		this.actiontype = actiontype;
	}
    
    
    
    
    
    
     
}
