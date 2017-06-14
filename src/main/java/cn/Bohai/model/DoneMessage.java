package cn.Bohai.model;


import java.io.Serializable;

/**
 * Created by Jaye on 2017/5/13.
 */
public class DoneMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 用户密码
     */
    private String start;
    /**
     * 流程类型
     */
    private String flowtype;
    /**
     * 客户端类型
     */
    private String limit;
    /**
     * 客户端识别码
     */
    private String flowname;
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getStart() {
		return start;
	}
	public void setStart(String start) {
		this.start = start;
	}
	public String getLimit() {
		return limit;
	}
	public void setLimit(String limit) {
		this.limit = limit;
	}
	public String getFlowname() {
		return flowname;
	}
	public void setFlowname(String flowname) {
		this.flowname = flowname;
	}
	public String getFlowtype() {
		return flowtype;
	}
	public void setFlowtype(String flowtype) {
		this.flowtype = flowtype;
	}
    
     
}
