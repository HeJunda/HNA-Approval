package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Junda on 2017/5/13.
 */
public class HistoricalApproval implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 用户ID
     */
    private String userid;
    /**
     * 流程ID
     */
    private String instanceid;
    /**
     * 起始页
     */
    private String start;
    /**
     * 每页条数
     */
    private String limit;

	public String getInstanceid() {
		return instanceid;
	}

	public void setInstanceid(String instanceid) {
		this.instanceid = instanceid;
	}

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

    
}
