package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Junda on 2017/6/7.
 */
public class Processing implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 任务ID
     */
    private String taskeid;
    /**
     * 节点动作按钮名称
     */
    private String actionname;
    /**
     * 处理意见
     */
    private String remark;
    /**
     * 按钮类型
     */
    private String actiontype;
    /**
     * 按钮值
     */
    private String actionvalue;
    /**
     * 按下一步处理人
     */
    private String nextopermap;
//    /**
//     * 流程变量
//     */
//    private String flowvar;
    /**
     * 驳回之后返回类型
     */
    private String comeback;
    /**
     * 客户端类型
     */
    private String clienttype;
    /**
     * 表单类型
     */
    private String formtype;
    /**
     * 分阅人员/协作人员
     */
    private String receiveuserids;
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getTaskeid() {
		return taskeid;
	}
	public void setTaskeid(String taskeid) {
		this.taskeid = taskeid;
	}
	public String getActionname() {
		return actionname;
	}
	public void setActionname(String actionname) {
		this.actionname = actionname;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getActiontype() {
		return actiontype;
	}
	public void setActiontype(String actiontype) {
		this.actiontype = actiontype;
	}
	public String getActionvalue() {
		return actionvalue;
	}
	public void setActionvalue(String actionvalue) {
		this.actionvalue = actionvalue;
	}
	public String getNextopermap() {
		return nextopermap;
	}
	public void setNextopermap(String nextopermap) {
		this.nextopermap = nextopermap;
	}
//	public String getFlowvar() {
//		return flowvar;
//	}
//	public void setFlowvar(String flowvar) {
//		this.flowvar = flowvar;
//	}
	public String getComeback() {
		return comeback;
	}
	public void setComeback(String comeback) {
		this.comeback = comeback;
	}
	public String getClienttype() {
		return clienttype;
	}
	public void setClienttype(String clienttype) {
		this.clienttype = clienttype;
	}
	public String getFormtype() {
		return formtype;
	}
	public void setFormtype(String formtype) {
		this.formtype = formtype;
	}
	public String getReceiveuserids() {
		return receiveuserids;
	}
	public void setReceiveuserids(String receiveuserids) {
		this.receiveuserids = receiveuserids;
	}


    
    
}
