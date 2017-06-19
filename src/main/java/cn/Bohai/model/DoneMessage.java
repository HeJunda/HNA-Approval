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
     * 流程类型
     */
    private String flowtype;
    /**
     * 每页条数
     */
    private int limit;
    /**
     * 起始页
     */
    private int start;
    /**
     * 流程标题
     */
    private String flowname;
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
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
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
    
     
}
