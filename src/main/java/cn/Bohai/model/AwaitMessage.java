package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Junda on 2017/5/13.
 */
public class AwaitMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 起始页
     */
    private String start;
    /**
     * 每页条数
     */
    private String limit;
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
    
     
}
