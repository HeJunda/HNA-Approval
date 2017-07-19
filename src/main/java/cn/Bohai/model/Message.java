package cn.Bohai.model;

import java.io.Serializable;

/**
 * Created by Jaye on 2017/5/13.
 */
public class Message implements Serializable {

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
    
    
     
}

