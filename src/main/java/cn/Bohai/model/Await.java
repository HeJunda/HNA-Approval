package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Junda on 2017/6/2.
 */
public class Await implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 起始页
     */
    private int start;
    
    /**
     * 每页条数
     */
    private int limit;
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
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public String getFlowname() {
		return flowname;
	}
	public void setFlowname(String flowname) {
		this.flowname = flowname;
	}
    
    
}
