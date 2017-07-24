package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Junda on 2017/5/13.
 */
public class SplitRead implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 是否已读(1-已读 0-未读)
     */
    private int hasread;
    /**
     * 任务或流程名称
     */
    private String flowname;
    /**
     * 起始页
     */
    private int start;
    /**
     * 每页条数
     */
    private int limit;
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
//	public String getHasread() {
//		return hasread;
//	}
//	public void setHasread(String hasread) {
//		this.hasread = hasread;
//	}
	public String getFlowname() {
		return flowname;
	}
	public void setFlowname(String flowname) {
		this.flowname = flowname;
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
	public int getHasread() {
		return hasread;
	}
	public void setHasread(int hasread) {
		this.hasread = hasread;
	}
    
}

